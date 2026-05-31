import ChatRepo from "../repo/chat-repo.js";

export async function handleChatQuestion(req, res) {
  const { message, history } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Pesan pertanyaan wajib diisi."
    });
  }

  try {
    const replyText = await ChatRepo.askBot(message, history || []);

    return res.status(200).json({
      success: true,
      reply: replyText
    });
  } catch (error) {
    console.error("Chat controller error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Asisten AI GiziMeal sedang sibuk.",
      error: error.message
    });
  }
}