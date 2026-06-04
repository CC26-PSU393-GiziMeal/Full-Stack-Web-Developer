import PredictRepo from "../repo/predict-repo.js";
import UserRepo from "../../users/repo/user-repo.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function predict(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "File gambar wajib diupload" });
    }

    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    for (const file of req.files) {
      if (file.size > MAX_FILE_SIZE) {
        return res.status(400).json({
          success: false,
          message: `Ukuran gambar ${file.originalname} terlalu besar. Maksimal 1MB.`,
        });
      }
    }

    const result = await PredictRepo.predictImage(req.files);
    if (!result) throw new Error("Hugging Face API tidak mengembalikan respon data apa pun.");

    const userId = req.headers["x-user-id"] || req.body.userId;
    if (userId) {
      try {
        let namaBahanGabungan = "Bahan Makanan";
        let totalSkor = 0;
        let jumlahItem = 0;

        if (req.files && req.files.length > 0) {
          namaBahanGabungan = req.files.map(f => f.originalname).join(", ");
        }
        let predictionsData = result.per_image_predictions || result.predictions || result.prediction;
        if (predictionsData && !Array.isArray(predictionsData)) {
          predictionsData = [predictionsData];
        }

        if (Array.isArray(predictionsData) && predictionsData.length > 0) {
          predictionsData.forEach(item => {
            if (!item) return;

            let rawConfidence = item.confidence_percent || item.confidence_score || 0;
            if (typeof rawConfidence === "string") {
              rawConfidence = rawConfidence.replace("%", "");
            }

            const confidenceNum = parseFloat(rawConfidence);
            const skorAkurasi = Math.round(confidenceNum < 1 && confidenceNum > 0 ? confidenceNum * 100 : confidenceNum);

            totalSkor += skorAkurasi;
            jumlahItem++;
          });
        }

        const skorRataRata = jumlahItem > 0 ? Math.round(totalSkor / jumlahItem) : 0;

        const singleRecordToSave = {
          bahan: namaBahanGabungan,
          skor: skorRataRata
        };

        console.log(`[SUPABASE] Menyimpan 1 riwayat ringkasan (${namaBahanGabungan}) ke Supabase...`);
        await UserRepo.saveScanHistory(userId, [singleRecordToSave]);
        console.log("[SUPABASE] Riwayat tunggal berhasil dicatat.");

      } catch (dbError) {
        console.error("⚠️ Gagal mencatat riwayat ringkasan ke database Supabase:", dbError.message);
      }
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("❌ CRITICAL ERROR DI CONTROLLER:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memproses prediksi di server",
      error: error.message,
    });
  }
}

export async function getClasses(req, res) {
  try {
    const response = await fetch("https://cc26-psu393-gizimeal-api.hf.space/classes");
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Gagal ambil classes" });
  }
}

export async function getRecipeImage(req, res) {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ success: false, message: "Query parameter wajib diisi" });
    }
    const imageUrl = await PredictRepo.searchImage(query);
    return res.status(200).json({ success: true, data: { imageUrl } });
  } catch (error) {
    console.error("Pexels error:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil gambar dari Pexels", error: error.message });
  }
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRecipeDetails(req, res) {
  const { menu_name } = req.query;
  if (!menu_name) return res.status(400).json({ success: false, message: "Parameter menu_name wajib diisi" });

  const modelsToTry = ["gemini-flash-latest"];
  let text = "";

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    for (let i = 0; i < modelsToTry.length; i++) {
      const currentModelName = modelsToTry[i];
      let attempts = 0;
      const maxAttempts = 2;

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
          break;
        } catch (error) {
          attempts++;
          const isServerBusy = error.status === 503 || error.status === 429 || error.message.includes("503") || error.message.includes("429");
          if (isServerBusy && attempts < maxAttempts) {
            console.warn(`Model ${currentModelName} sibuk/limit harian. Menunggu 8 detik...`);
            await delay(8000);
          } else {
            throw error;
          }
        }
      }
      if (text) break;
    }

    if (!text) throw new Error("Server AI sedang mengalami lonjakan beban yang sangat tinggi.");

    const cleanedText = text.replace(/```json|```/gi, "").trim();
    const jsonResep = JSON.parse(cleanedText);
    return res.status(200).json({ success: true, data: jsonResep });
  } catch (error) {
    console.error("Gemini AI Final Error:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal memproses resep dari AI karena server eksternal sedang sibuk. Silakan coba beberapa saat lagi.",
      error: error.message
    });
  }
}

export async function saveRecipeHistory(req, res) {
  try {
    const { userId, menuName, recipeData } = req.body;
    console.log("-> REQUEST MASUK KE BACKEND:", { userId, menuName });

    if (!userId || !menuName) {
      return res.status(400).json({ success: false, message: "userId dan menuName wajib diisi" });
    }

    await UserRepo.saveRecipeHistory(userId, menuName, recipeData);
    return res.status(201).json({ success: true, message: "Riwayat resep berhasil dicatat ke Supabase secara instan." });
  } catch (error) {
    console.error("Gagal mencatat riwayat resep di Supabase:", error);
    return res.status(500).json({ success: false, message: "Gagal menyimpan riwayat", error: error.message });
  }
}

export async function getRecipeHistory(req, res) {
  try {
    const { userId } = req.params;
    const history = await UserRepo.getRecipeHistory(userId);
    return res.status(200).json({ success: true, data: history || [] });
  } catch (error) {
    console.error("Error fetching recipe history:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil data riwayat resep", error: error.message });
  }
}