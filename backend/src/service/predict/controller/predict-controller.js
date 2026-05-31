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