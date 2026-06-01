import express from "express";
import multer from "multer";
import { predict, getRecipeImage, getRecipeDetails } from "../controller/predict-controller.js";
import UserRepo from "../../users/repo/user-repo.js"; // Pastikan path import ini sesuai dengan struktur folder backend kamu

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

router.post("/predict", (req, res, next) => {
  // Ambil field "files" dengan limit maksimal 5 file gambar
  upload.array("files", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Ukuran salah satu gambar terlalu besar. Maksimal ukuran file adalah 1MB.",
        });
      }
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    next();
  });
}, predict);

router.get("/classes", async (req, res) => {
  try {
    const response = await fetch("https://cc26-psu393-gizimeal-api.hf.space/classes");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Gagal ambil classes" });
  }
});

router.get("/pexels/image", getRecipeImage);
router.get("/recipe-details", getRecipeDetails);

router.post("/recipe-history", async (req, res) => {
  try {
    const { userId, menuName, recipeData } = req.body;

    console.log("-> REQUEST MASUK KE BACKEND:", { userId, menuName });

    if (!userId || !menuName) {
      return res.status(400).json({ 
        success: false, 
        message: "userId dan menuName wajib diisi" 
      });
    }

    // Pastikan fungsi database di repo kamu terpanggil
    await UserRepo.saveRecipeHistory(userId, menuName, recipeData);
    
    return res.status(201).json({
      success: true,
      message: "Riwayat resep berhasil dicatat ke Supabase secara instan."
    });
  } catch (error) {
    console.error("Gagal mencatat riwayat resep di Supabase:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan riwayat",
      error: error.message
    });
  }
});

// =================================================================
// ROUTE BARU: Ambil Riwayat Resep AI dari Supabase
// =================================================================
router.get("/recipe-history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Panggil fungsi repo Supabase kamu
    const history = await UserRepo.getRecipeHistory(userId);
    
    return res.status(200).json({
      success: true,
      data: history || []
    });
  } catch (error) {
    console.error("Error fetching recipe history:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data riwayat resep",
      error: error.message
    });
  }
});

export default router;