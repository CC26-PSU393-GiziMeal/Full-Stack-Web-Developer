import axios from "axios";
import FormData from "form-data";

const HF_API = "https://cc26-psu393-gizimeal-api.hf.space/predict";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_API = "https://api.pexels.com/v1/search";

class PredictRepo {
  async predictImage(files) {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file.buffer, {
          filename: file.originalname,
          contentType: file.mimetype,
        });
      });

      const response = await axios.post(HF_API, formData, {
        headers: {
          ...formData.getHeaders(),
        }
      });

      console.log("HF MULTI-IMAGE SUCCESS IN REPO:", response.data);
      return response.data;

    } catch (error) {
      console.error("HF ERROR FULL IN REPO:");
      if (error.response) {
        console.error("Status:", error.response.status);
        console.dir(error.response.data, { depth: null });
        throw new Error(JSON.stringify(error.response.data));
      } else {
        console.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async searchImage(query) {
    if (!PEXELS_API_KEY) throw new Error("PEXELS_API_KEY belum diset di .env");
    const response = await axios.get(PEXELS_API, {
      headers: { Authorization: PEXELS_API_KEY },
      params: { query, per_page: 1, orientation: "landscape" },
    });
    const photos = response.data.photos;
    return photos && photos.length > 0 ? photos[0].src.large2x : null;
  }
}

export default new PredictRepo();