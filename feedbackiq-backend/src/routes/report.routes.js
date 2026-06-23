import { Router } from "express";

import {
  getReports,
  getReportById,
  deleteReport,
  getReportStats,
} from "../controllers/report.controller.js";

const router = Router();
router.get("/stats", getReportStats);

router.get("/", getReports);

router.get("/:id", getReportById);
router.delete("/:id", deleteReport);

export default router;
