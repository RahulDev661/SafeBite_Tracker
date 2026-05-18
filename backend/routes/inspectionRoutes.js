const express = require("express");
const router = express.Router();
const {
  createInspection,
  getAllInspections,
  getInspectionById,
  updateInspection,
  deleteInspection,
  getStats,
} = require("../controllers/inspectionController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

// @route   GET  /api/inspections/stats  → Admin & Officer
router.get("/stats", protect, authorize("admin", "officer"), getStats);

// @route   POST /api/inspections        → Officer only
router.post("/", protect, authorize("admin", "officer"), createInspection);

// @route   GET  /api/inspections        → All roles (filtered per role in controller)
router.get("/", protect, getAllInspections);

// @route   GET  /api/inspections/:id    → All roles
router.get("/:id", protect, getInspectionById);

// @route   PUT  /api/inspections/:id    → Officer & Admin (with image uploads)
router.put(
  "/:id",
  protect,
  authorize("admin", "officer"),
  upload.array("images", 10),
  updateInspection
);

// @route   DELETE /api/inspections/:id  → Admin only
router.delete("/:id", protect, authorize("admin"), deleteInspection);

module.exports = router;
