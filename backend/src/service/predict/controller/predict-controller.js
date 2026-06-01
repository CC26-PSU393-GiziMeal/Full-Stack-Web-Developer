import PredictRepo from "../repo/predict-repo.js";
import UserRepo from "../../users/repo/user-repo.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function predict(req, res) {
  try {
    // 1. Validasi File Masuk
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "File gambar wajib diupload",
      });
    }

    // 2. Validasi Ukuran File (Maksimal 1MB)
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    for (const file of req.files) {
      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
          success: false,
          message: `Ukuran gambar ${file.originalname} terlalu besar. Maksimal 1MB.`,
        });
      }
    }

    // 3. Ambil data dari Hugging Face melalui Repo
    const result = await PredictRepo.predictImage(req.files);
    
    if (!result) {
      throw new Error("Hugging Face API tidak mengembalikan respon data apa pun.");
    }

    // 4. Logika Penyambungan Riwayat ke Database (Background Task menggunakan setTimeout)
    const userId = req.headers["x-user-id"] || req.body.userId; 
    if (userId) {
      setTimeout(async () => {
        try {
          // Ambil array prediksi secara dinamis dan aman
          const predictionsData = Array.isArray(result) 
            ? result 
            : (result.predictions || result.prediction || []);

          if (Array.isArray(predictionsData)) {
            for (const item of predictionsData) {
              if (!item) continue;
              const namaBahan = item.detected_item || item.label || "Bahan Makanan";
              const skorAkurasi = Math.round(
                parseFloat(item.confidence_percent || (item.confidence_score * 100) || 0)
              );
              await UserRepo.saveScanHistory(userId, { bahan: namaBahan, skor: skorAkurasi });
            }
          } else if (typeof predictionsData === "object" && predictionsData !== null) {
            const namaBahan = predictionsData.detected_item || predictionsData.label || "Bahan Makanan";
            const skorAkurasi = Math.round(
              parseFloat(predictionsData.confidence_percent || (predictionsData.confidence_score * 100) || 0)
            );
            await UserRepo.saveScanHistory(userId, { bahan: namaBahan, skor: skorAkurasi });
          }
        } catch (dbError) {
          console.error("⚠️ Background DB Error:", dbError.message);
        }
      }, 0);
    }

    // 5. Kirim langsung data respon murni ke frontend tanpa restrukturisasi yang merusak
    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    // CETAK EROR UTAMA DI TERMINAL BACKEND UNTUK PEMANTAUAN UTAMA KAMU
    console.error("❌ CRITICAL ERROR DI CONTROLLER:", error);
    
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses prediksi di server",
      error: error.message,
    });
  }
}

export async function getRecipeImage(req, res) {
  try {
    const { query } = req.query;
 
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Query parameter wajib diisi",
      });
    }
 
    const imageUrl = await PredictRepo.searchImage(query);
 
    return res.status(200).json({
      success: true,
      data: { imageUrl },
    });
 
  } catch (error) {
    console.error("Pexels error:", error);
 
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil gambar dari Pexels",
      error: error.message,
    });
  }
}

// Helper untuk memberikan jeda waktu (delay) saat terjadi error 503/429 di server Google
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRecipeDetails(req, res) {
  const { menu_name } = req.query;

  if (!menu_name) {
    return res.status(400).json({ success: false, message: "Parameter menu_name wajib diisi" });
  }

  // Model stabil yang didukung penuh oleh library SDK bawaanmu
  const modelsToTry = ["gemini-flash-latest"];
  let text = "";

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    for (let i = 0; i < modelsToTry.length; i++) {
      const currentModelName = modelsToTry[i];
      let attempts = 0;
      const maxAttempts = 2; // Coba maksimal 2 kali perulangan sebelum melempar error fallback

      while (attempts < maxAttempts) {
        try {
          console.log(`Mencoba model: ${currentModelName} (Percobaan ke-${attempts + 1})`);
          const model = genAI.getGenerativeModel({ model: currentModelName });

          const prompt = `
            Berikan resep lengkap untuk masakan bernama: ${menu_name}.
            Gunakan bahasa Indonesia yang ramah, mudah dipahami, dan berikan catatan gizi singkat.
            Berikan respons DALAM FORMAT JSON SAJA dengan struktur persis seperti berikut tanpa ada field tambahan:
            {
              "nama_masakan": "${menu_name}",
              "bahan_bahan": ["bahan 1 beserta jumlahnya", "bahan 2", "..."],
              "cara_memasak": ["langkah 1", "langkah 2", "..."],
              "catatan_gizi": "catatan gizi singkat di sini"
            }
          `;

          const result = await model.generateContent(prompt);
          const response = await result.response;
          text = response.text();
          
          break; // Sukses mendapatkan teks, keluar dari loop attempts
        } catch (error) {
          attempts++;
          
          // Deteksi apakah server Google sedang sibuk (503) atau terkena rate limit kuota harian (429)
          const isServerBusy = error.status === 503 || error.status === 429 || error.message.includes("503") || error.message.includes("429");
          
          if (isServerBusy && attempts < maxAttempts) {
            console.warn(`Model ${currentModelName} sibuk/limit harian. Menunggu 8 detik sebelum mencoba ulang ke-${attempts + 1}...`);
            await delay(8000); // Beri nafas ke server Google selama 8 detik sebelum dicoba ulang
          } else {
            throw error; // Jika error fatal / permanen (seperti API Key salah), langsung lempar ke catch utama
          }
        }
      }
      if (text) break;
    }

    if (!text) {
      throw new Error("Server AI sedang mengalami lonjakan beban yang sangat tinggi.");
    }

    // Pembersihan markdown string JSON hasil keluaran Gemini
    const cleanedText = text.replace(/```json|```/gi, "").trim();
    const jsonResep = JSON.parse(cleanedText);
    
    return res.status(200).json({
      success: true,
      data: jsonResep
    });
    
  } catch (error) {
    console.error("Gemini AI Final Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Gagal memproses resep dari AI karena server eksternal sedang sibuk. Silakan coba beberapa saat lagi.",
      error: error.message 
    });
  }
}