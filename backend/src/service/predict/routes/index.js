import express from "express";
import multer from "multer";
import { predict, getRecipeImage, getRecipeDetails } from "../controller/predict-controller.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

router.post("/predict", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Ukuran gambar terlalu besar. Maksimal ukuran file adalah 5MB.",
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

export default router;