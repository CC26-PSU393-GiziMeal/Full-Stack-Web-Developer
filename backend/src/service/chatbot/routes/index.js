import { Router } from "express";
import { handleChatQuestion } from "../controller/chat-controller.js";

const router = Router();

router.post("/ask", handleChatQuestion);

export default router;