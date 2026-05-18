const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["dairy", "meat", "grains", "vegetables", "fruits", "beverages", "spices", "processed", "other"],
    default: "other",
  },
  adulterantsFound: [{ type: String, trim: true }],
  result: {
    type: String,
    enum: ["pass", "fail", "warning"],
    default: "pass",
  },
  notes: { type: String, trim: true },
});

const inspectionSchema = new mongoose.Schema(
  {
    inspectionId: {
      type: String,
      unique: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completedDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["scheduled", "in-progress", "completed", "flagged", "cancelled"],
      default: "scheduled",
    },
    overallResult: {
      type: String,
      enum: ["pass", "fail", "warning", "pending"],
      default: "pending",
    },
    foodItems: [foodItemSchema],
    images: [
      {
        filename: String,
        path: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    // AI detection results
    aiAnalysis: {
      isProcessed: { type: Boolean, default: false },
      confidence: { type: Number, default: null },
      detectedIssues: [{ type: String }],
      modelVersion: { type: String, default: null },
      processedAt: { type: Date, default: null },
    },
    notes: {
      type: String,
      trim: true,
    },
    actionTaken: {
      type: String,
      trim: true,
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate inspectionId before saving
inspectionSchema.pre("save", async function (next) {
  if (!this.inspectionId) {
    const count = await mongoose.model("Inspection").countDocuments();
    this.inspectionId = `INS-${new Date().getFullYear()}-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Inspection", inspectionSchema);
