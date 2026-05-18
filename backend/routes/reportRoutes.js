const express = require("express");
const router = express.Router();
const {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// @route   POST /api/reports            → Officer & Admin
router.post("/", protect, authorize("admin", "officer"), createReport);

// @route   GET  /api/reports            → All roles (filtered per role in controller)
router.get("/", protect, getAllReports);

// @route   GET  /api/reports/:id        → All roles
router.get("/:id", protect, getReportById);

// @route   PUT  /api/reports/:id        → Officer & Admin
router.put("/:id", protect, authorize("admin", "officer"), updateReport);

// @route   DELETE /api/reports/:id      → Admin only
router.delete("/:id", protect, authorize("admin"), deleteReport);

module.exports = router;
