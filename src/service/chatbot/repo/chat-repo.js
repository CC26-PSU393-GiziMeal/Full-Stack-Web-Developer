import axios from "axios";

const HF_CHATBOT_API = "https://cc26-psu393-gizimeal-api.hf.space/chatbot/ask";

class ChatRepo {
  async askBot(message, history = []) {
    try {
      const response = await axios.post(HF_CHATBOT_API, {
        message: message,
        history: history
      });

      console.log("HF CHATBOT SUCCESS:", response.data);

      if (response.data && response.data.reply) {
        return response.data.reply;
      }
      
      return "Maaf, asisten gizi tidak memberikan respons format yang sesuai.";
    } catch (error) {
      console.error("HF CHATBOT ERROR INTERNAL:");
      
      let errorMsg = error.message;
      if (error.response && error.response.data) {
        console.error(error.response.status, error.response.data);
        errorMsg = typeof error.response.data === 'object' 
          ? JSON.stringify(error.response.data) 
          : error.response.data;
      }

      throw new Error(errorMsg);
    }
  }
}

export default new ChatRepo();