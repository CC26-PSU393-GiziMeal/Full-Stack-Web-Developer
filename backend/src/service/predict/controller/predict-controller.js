import PredictRepo from "../repo/predict-repo.js";
import UserRepo from "../../users/repo/user-repo.js";

export async function predict(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File gambar wajib diupload",
      });
    }

    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: "Ukuran gambar terlalu besar. Maksimal ukuran file adalah 1MB.",
      });
    }

    // 1. Dapatkan data hasil analisis gambar dari AI Hugging Face
    const result = await PredictRepo.predictImage(req.file);

    // 2. LOGIKA PENYAMBUNGAN RIWAYAT: Jika ada userId dikirim dari frontend, catat ke database
    const { userId } = req.body; 
    if (userId && result && result.prediction) {
      const namaBahan = result.prediction.detected_item || "Bahan Makanan";
      
      // Bersihkan teks persentase ("89.72%") menjadi angka bulat murni (89)
      const skorAkurasi = Math.round(
        parseFloat(result.prediction.confidence_percent || result.prediction.confidence_score * 100 || 0)
      );

      // Jalankan fungsi simpan riwayat di background secara asinkronus
      await UserRepo.saveScanHistory(userId, {
        bahan: namaBahan,
        skor: skorAkurasi
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Predict controller error:", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat prediksi",
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

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getRecipeDetails(req, res) {
  const { menu_name } = req.query;

  if (!menu_name) {
    return res.status(400).json({ success: false, message: "Parameter menu_name wajib diisi" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
    const text = response.text();
    
    // Pembersihan markdown (sanitization)
    const cleanedText = text.replace(/```json|```/gi, "").trim();
    
    const jsonResep = JSON.parse(cleanedText);
    
    return res.status(200).json({
      success: true,
      data: jsonResep
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Gagal memproses resep dari AI",
      error: error.message 
    });
  }
}
// Trigger nodemon restart to reload .env