const Inspection = require("../models/Inspection");
const User = require("../models/User");

// @desc    Create a new inspection
// @route   POST /api/inspections
// @access  Private/Officer
const createInspection = async (req, res) => {
  try {
    const { restaurantId, scheduledDate, notes, foodItems } = req.body;

    const restaurant = await User.findById(restaurantId);
    if (!restaurant || restaurant.role !== "restaurant") {
      return res.status(404).json({ success: false, message: "Restaurant not found." });
    }

    const inspection = await Inspection.create({
      restaurant: restaurantId,
      restaurantName: restaurant.restaurantName || restaurant.name,
      officer: req.user.id,
      scheduledDate,
      notes,
      foodItems: foodItems ? JSON.parse(foodItems) : [],
    });

    res.status(201).json({ success: true, inspection });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Get all inspections (with role-based filtering)
// @route   GET /api/inspections
// @access  Private
const getAllInspections = async (req, res) => {
  try {
    const { status, result, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Officers see their own inspections; restaurants see only theirs
    if (req.user.role === "officer") filter.officer = req.user.id;
    if (req.user.role === "restaurant") filter.restaurant = req.user.id;

    if (status) filter.status = status;
    if (result) filter.overallResult = result;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Inspection.countDocuments(filter);
    const inspections = await Inspection.find(filter)
      .populate("officer", "name email badgeId")
      .populate("restaurant", "name email restaurantName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: inspections.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      inspections,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Get a single inspection
// @route   GET /api/inspections/:id
// @access  Private
const getInspectionById = async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id)
      .populate("officer", "name email badgeId department")
      .populate("restaurant", "name email restaurantName phone address");

    if (!inspection) {
      return res.status(404).json({ success: false, message: "Inspection not found." });
    }

    // Access control: restaurant can only see their own
    if (
      req.user.role === "restaurant" &&
      inspection.restaurant._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }

    res.status(200).json({ success: true, inspection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Update inspection (add findings, change status, upload images)
// @route   PUT /api/inspections/:id
// @access  Private/Officer
const updateInspection = async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ success: false, message: "Inspection not found." });
    }

    // Only the assigned officer or admin can update
    if (
      req.user.role === "officer" &&
      inspection.officer.toString() !== req.user.id
    ) {
      return res.status(403).json({ success: false, message: "Not authorized to update this inspection." });
    }

    const { status, overallResult, notes, actionTaken, followUpRequired, followUpDate, foodItems } = req.body;

    if (status) inspection.status = status;
    if (overallResult) inspection.overallResult = overallResult;
    if (notes) inspection.notes = notes;
    if (actionTaken) inspection.actionTaken = actionTaken;
    if (followUpRequired !== undefined) inspection.followUpRequired = followUpRequired;
    if (followUpDate) inspection.followUpDate = followUpDate;
    if (foodItems) inspection.foodItems = JSON.parse(foodItems);

    // Attach uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));
      inspection.images.push(...newImages);
    }

    // Auto-set completedDate
    if (status === "completed" && !inspection.completedDate) {
      inspection.completedDate = new Date();
    }

    await inspection.save();
    res.status(200).json({ success: true, inspection });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Delete an inspection
// @route   DELETE /api/inspections/:id
// @access  Private/Admin
const deleteInspection = async (req, res) => {
  try {
    const inspection = await Inspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ success: false, message: "Inspection not found." });
    }
    await inspection.deleteOne();
    res.status(200).json({ success: true, message: "Inspection deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/inspections/stats
// @access  Private/Admin|Officer
const getStats = async (req, res) => {
  try {
    const filter = req.user.role === "officer" ? { officer: req.user.id } : {};

    const [total, completed, flagged, failed, pending] = await Promise.all([
      Inspection.countDocuments(filter),
      Inspection.countDocuments({ ...filter, status: "completed" }),
      Inspection.countDocuments({ ...filter, status: "flagged" }),
      Inspection.countDocuments({ ...filter, overallResult: "fail" }),
      Inspection.countDocuments({ ...filter, status: "scheduled" }),
    ]);

    // Monthly trend (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrend = await Inspection.aggregate([
      { $match: { ...filter, createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 },
          failed: { $sum: { $cond: [{ $eq: ["$overallResult", "fail"] }, 1, 0] } },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      stats: { total, completed, flagged, failed, pending, monthlyTrend },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createInspection, getAllInspections, getInspectionById, updateInspection, deleteInspection, getStats };
