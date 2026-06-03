import express from "express";
import { uploadMiddleware } from "../../../../middlewares/upload.js";
import multer from "multer";
import { predict, getClasses, getRecipeImage, getRecipeDetails, saveRecipeHistory, getRecipeHistory } from "../controller/predict-controller.js";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1 * 1024 * 1024 },
});

router.post("/predict", uploadMiddleware, predict);
router.get("/classes", getClasses);
router.get("/pexels/image", getRecipeImage);
router.get("/recipe-details", getRecipeDetails);
router.post("/recipe-history", saveRecipeHistory);
router.get("/recipe-history/:userId", getRecipeHistory);

export default router;