import axios from "axios";
import FormData from "form-data";

const HF_API = "https://cc26-psu393-gizimeal-api.hf.space/predict";
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const PEXELS_API = "https://api.pexels.com/v1/search";

class PredictRepo {
  async predictImage(file) {
    try {
      const formData = new FormData();

      formData.append(
        "files",
        file.buffer,
        file.originalname
      );

      const response = await axios.post(
        HF_API,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      console.log("HF SUCCESS:", response.data);

      return response.data;

    } catch (error) {

      console.error("HF ERROR FULL:");

      if (error.response) {
        console.error(error.response.status);

        console.dir(
          error.response.data,
          { depth: null }
        );
      } else {
        console.error(error.message);
      }

      throw new Error(
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    }
  }

  async searchImage(query) {
    try {
      if (!PEXELS_API_KEY) {
        throw new Error("PEXELS_API_KEY belum diset di .env");
      }
 
      const response = await axios.get(PEXELS_API, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
        params: {
          query,
          per_page: 1,
          orientation: "landscape",
        },
      });
 
      const photos = response.data.photos;
 
      if (!photos || photos.length === 0) {
        return null;
      }
 
      return photos[0].src.large2x;
 
    } catch (error) {
      console.error("Pexels error:", error.message);
      throw new Error(error.response?.data?.error || error.message);
    }
  }
}

export default new PredictRepo()