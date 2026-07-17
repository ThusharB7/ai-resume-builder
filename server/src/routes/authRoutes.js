const express = require("express");

const {
  register,
  verifyOtp,
  resendOtp,
  login,
  getMe,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);

// Protected route
router.get("/me", authMiddleware, getMe);

module.exports = router;