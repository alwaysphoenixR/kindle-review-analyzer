import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL;

export async function connectDB() {
  try {
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in .env");
    }

    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB Disconnected");
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
}
