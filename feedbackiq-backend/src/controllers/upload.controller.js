import csv from "csv-parser";
import { Readable } from "stream";

import { generateReport } from "../services/ml.service.js";
import { ReportModel } from "../models/report.model.js";

export async function uploadCSV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Optional: Validate file type
    if (
      !req.file.mimetype.includes("csv") &&
      req.file.mimetype !== "application/vnd.ms-excel"
    ) {
      return res.status(400).json({
        message: "Only CSV files are allowed",
      });
    }

    const reviews = [];

    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (row) => {
        if (row.review?.trim()) {
          reviews.push(row.review.trim());
        }
      })
      .on("end", async () => {
        try {
          if (reviews.length === 0) {
            return res.status(400).json({
              message:
                "CSV must contain at least one review in a 'review' column",
            });
          }

          const report = await generateReport(reviews);

          const savedReport = await ReportModel.create({
            filename: req.file.originalname,
            totalReviews: report.total_reviews,
            positiveReviews: report.positive_reviews,
            negativeReviews: report.negative_reviews,
            positivePercentage: report.positive_percentage,
            negativePercentage: report.negative_percentage,
            topComplaints: report.top_complaints,
          });

          // FIXED: We now send the camelCase values back to the React frontend
          // exactly as defined in the DATA_CONTRACT.md
          return res.status(201).json({
            message: "Report generated successfully",
            reportId: savedReport._id,
            report: {
              _id: savedReport._id,
              filename: savedReport.filename,
              totalReviews: savedReport.totalReviews,
              positiveReviews: savedReport.positiveReviews,
              negativeReviews: savedReport.negativeReviews,
              positivePercentage: savedReport.positivePercentage,
              negativePercentage: savedReport.negativePercentage,
              topComplaints: savedReport.topComplaints,
            },
          });
        } catch (error) {
          console.error("CSV Processing Error:", error);

          return res.status(500).json({
            message: "Failed to generate report",
          });
        }
      })
      .on("error", (error) => {
        console.error("CSV Parse Error:", error);

        return res.status(400).json({
          message: "Invalid CSV file",
        });
      });
  } catch (error) {
    console.error("Upload CSV Error:", error);

    return res.status(500).json({
      message: "Upload failed",
    });
  }
}
