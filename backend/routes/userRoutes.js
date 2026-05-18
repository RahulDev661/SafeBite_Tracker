const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateProfile,
  changePassword,
  toggleUserStatus,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { upload } = require("../middleware/uploadMiddleware");

// @route   GET  /api/users              → Admin only
router.get("/", protect, authorize("admin"), getAllUsers);

// @route   GET  /api/users/:id          → Admin only
router.get("/:id", protect, authorize("admin"), getUserById);

// @route   PUT  /api/users/profile      → Any logged-in user
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

// @route   PUT  /api/users/change-password
router.put("/change-password", protect, changePassword);

// @route   PATCH /api/users/:id/status  → Admin only
router.patch("/:id/status", protect, authorize("admin"), toggleUserStatus);

// @route   DELETE /api/users/:id        → Admin only
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
