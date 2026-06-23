import mongoose from "mongoose";

import { generateReport } from "../services/ml.service.js";
import { ReportModel } from "../models/report.model.js";

export async function getReports(req, res) {
  try {
    const reports = await ReportModel.find()
      .select(
        "filename totalReviews positivePercentage negativePercentage createdAt",
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(reports);
  } catch (error) {
    console.error("Get Reports Error:", error);

    return res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
}

export async function getReportById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid report id",
      });
    }

    const report = await ReportModel.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.error("Get Report By Id Error:", error);

    return res.status(500).json({
      message: "Failed to fetch report",
    });
  }
}

export async function deleteReport(req, res) {
  try {
    return res.status(403).json({
      message: "SORRY NO MODIFICATIONS IN DEMO REVIEWS",
    });
    // const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({
    //     message: "Invalid report id",
    //   });
    // }

    // const report = await ReportModel.findByIdAndDelete(id);

    // if (!report) {
    //   return res.status(404).json({
    //     message: "Report not found",
    //   });
    // }

    // return res.status(200).json({
    //   message: "Report deleted successfully",
    // });
  } catch (error) {
    console.error("Delete Report Error:", error);

    return res.status(500).json({
      message: "Failed to delete report",
    });
  }
}

export async function getReportStats(req, res) {
  try {
    const reports = await ReportModel.find().select(
      "totalReviews positivePercentage negativePercentage",
    );

    const totalReports = reports.length;

    const totalReviewsAnalyzed = reports.reduce(
      (sum, report) => sum + report.totalReviews,
      0,
    );

    const averagePositivePercentage =
      totalReports > 0
        ? (
            reports.reduce(
              (sum, report) => sum + report.positivePercentage,
              0,
            ) / totalReports
          ).toFixed(2)
        : 0;

    const averageNegativePercentage =
      totalReports > 0
        ? (
            reports.reduce(
              (sum, report) => sum + report.negativePercentage,
              0,
            ) / totalReports
          ).toFixed(2)
        : 0;

    return res.status(200).json({
      totalReports,
      totalReviewsAnalyzed,
      averagePositivePercentage: Number(averagePositivePercentage),
      averageNegativePercentage: Number(averageNegativePercentage),
    });
  } catch (error) {
    console.error("Get Report Stats Error:", error);

    return res.status(500).json({
      message: "Failed to fetch report statistics",
    });
  }
}
