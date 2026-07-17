const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const {
  findUserByEmail,
  createUser,
  verifyUser,
  findUserById,
} = require("../models/userModel");

const {
  createVerification,
  findVerificationByUserId,
  incrementAttempts,
  deleteVerification,
} = require("../models/emailVerificationModel");

const {
  sendVerificationOtp,
} = require("../services/emailService");

const generateOtp = require("../utils/generateOtp");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await createUser(
      name.trim(),
      normalizedEmail,
      passwordHash
    );

    const otp = generateOtp();

    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await createVerification(user.id, otpHash, expiresAt);

    // Send verification email
    await sendVerificationOtp(user.email, otp);

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const verification = await findVerificationByUserId(user.id);

    if (!verification) {
      return res.status(400).json({
        message: "No verification code found. Please request a new OTP.",
      });
    }

    if (verification.attempts >= 5) {
      return res.status(429).json({
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    if (new Date() > new Date(verification.expires_at)) {
      await deleteVerification(user.id);

      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    const isOtpValid = await bcrypt.compare(
      otp.toString(),
      verification.otp_hash
    );

    if (!isOtpValid) {
      const updatedVerification = await incrementAttempts(user.id);

      const attemptsLeft = 5 - updatedVerification.attempts;

      return res.status(400).json({
        message: "Invalid OTP",
        attemptsLeft,
      });
    }

    const verifiedUser = await verifyUser(user.id);

    await deleteVerification(user.id);

    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        id: verifiedUser.id,
        name: verifiedUser.name,
        email: verifiedUser.email,
        isVerified: verifiedUser.is_verified,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function resendOtp(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const existingVerification = await findVerificationByUserId(user.id);

    if (existingVerification) {
      const createdAt = new Date(existingVerification.created_at);
      const now = new Date();

      const secondsSinceLastOtp = Math.floor(
        (now - createdAt) / 1000
      );

      if (secondsSinceLastOtp < 60) {
        return res.status(429).json({
          message: "Please wait before requesting another OTP",
          retryAfter: 60 - secondsSinceLastOtp,
        });
      }
    }

    const otp = generateOtp();

    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await createVerification(
      user.id,
      otpHash,
      expiresAt
    );

    await sendVerificationOtp(user.email, otp);

    return res.status(200).json({
      message: "A new OTP has been sent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getMe(req, res) {
  try {
    const user = await findUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Get Me error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  register,
  verifyOtp,
  resendOtp,
  login,
  getMe,
};