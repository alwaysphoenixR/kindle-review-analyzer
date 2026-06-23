import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8000";

export async function generateReport(reviews) {
  try {
    const response = await axios.post(
      `${ML_SERVICE_URL}/report`,
      {
        reviews,
      },
      // {
      //   timeout: 120000, // 2 minutes
      // }
    );

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", error.response?.data || error.message);

    throw new Error("Failed to generate report from ML service");
  }
}
