import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    topic_id: {
      type: Number,
      required: true,
    },

    count: {
      type: Number,
      required: true,
      min: 0,
    },

    theme: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      required: true,
      trim: true,
    },

    recommendation: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const reportSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: [true, "Filename is required"],
      trim: true,
    },

    totalReviews: {
      type: Number,
      required: true,
      min: 0,
    },

    positiveReviews: {
      type: Number,
      required: true,
      min: 0,
    },

    negativeReviews: {
      type: Number,
      required: true,
      min: 0,
    },

    positivePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    negativePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    topComplaints: {
      type: [complaintSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

reportSchema.pre("save", function (next) {
  const totalPercentage = this.positivePercentage + this.negativePercentage;

  if (totalPercentage > 100.1) {
    return next(
      new Error("Positive and negative percentages cannot exceed 100%"),
    );
  }

  next();
});

export const ReportModel = mongoose.model("Report", reportSchema);
