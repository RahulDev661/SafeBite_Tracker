const Report = require("../models/Report");
const Inspection = require("../models/Inspection");

// @desc    Create a report for an inspection
// @route   POST /api/reports
// @access  Private/Officer|Admin
const createReport = async (req, res) => {
  try {
    const { inspectionId, title, summary, findings, severity, recommendations, actionRequired, actionDeadline } = req.body;

    const inspection = await Inspection.findById(inspectionId);
    if (!inspection) {
      return res.status(404).json({ success: false, message: "Inspection not found." });
    }

    const report = await Report.create({
      inspection: inspectionId,
      generatedBy: req.user.id,
      title,
      summary,
      findings,
      severity,
      recommendations,
      actionRequired,
      actionDeadline,
    });

    res.status(201).json({ success: true, report });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private
const getAllReports = async (req, res) => {
  try {
    const { severity, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (req.user.role === "restaurant") filter.isPublic = true;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Report.countDocuments(filter);
    const reports = await Report.find(filter)
      .populate("inspection", "inspectionId restaurantName scheduledDate")
      .populate("generatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Get a single report
// @route   GET /api/reports/:id
// @access  Private
const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate({
        path: "inspection",
        populate: [
          { path: "officer", select: "name email badgeId" },
          { path: "restaurant", select: "name email restaurantName" },
        ],
      })
      .populate("generatedBy", "name email role");

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found." });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Update a report
// @route   PUT /api/reports/:id
// @access  Private/Admin|Officer
const updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found." });
    }

    const allowedFields = ["title", "summary", "findings", "severity", "recommendations", "actionRequired", "actionDeadline", "status", "isPublic"];
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) report[field] = req.body[field];
    });

    await report.save();
    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Delete a report
// @route   DELETE /api/reports/:id
// @access  Private/Admin
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found." });
    }
    await report.deleteOne();
    res.status(200).json({ success: true, message: "Report deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createReport, getAllReports, getReportById, updateReport, deleteReport };
