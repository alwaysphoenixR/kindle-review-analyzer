import { Router } from "express";

import { upload } from "../middlewares/upload.middleware.js";

import { uploadCSV } from "../controllers/upload.controller.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      next();
    });
  },
  uploadCSV,
);

export default router;
