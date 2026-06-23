import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import reportRoutes from "./routes/report.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is running",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

app.use("/report", reportRoutes);
app.use("/upload", uploadRoutes);

try {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error("Server Startup Error:", error);
  process.exit(1);
}
