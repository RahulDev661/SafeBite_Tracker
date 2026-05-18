const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    inspection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inspection",
      required: true,
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    findings: [
      {
        item: String,
        issue: String,
        severity: {
          type: String,
          enum: ["low", "medium", "high", "critical"],
          default: "low",
        },
      },
    ],
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    recommendations: [{ type: String, trim: true }],
    actionRequired: {
      type: Boolean,
      default: false,
    },
    actionDeadline: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Report", reportSchema);
