const bcrypt = require("bcryptjs");

const {
  findUserByEmail,
  createUser,
  verifyUser,
} = require("../models/userModel");

const {
  createVerification,
  findVerificationByUserId,
  incrementAttempts,
  deleteVerification,
} = require("../models/emailVerificationModel");

const generateOtp = require("../utils/generateOtp");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 2. Normalize the email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Check whether the email already exists
    const existingUser = await findUserByEmail(normalizedEmail);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // 4. Hash the password
    const passwordHash = await bcrypt.hash(password, 12);

    // 5. Create the user
    const user = await createUser(
      name.trim(),
      normalizedEmail,
      passwordHash
    );

    // 6. Generate a 6-digit OTP
    const otp = generateOtp();

    // 7. Hash the OTP before storing it
    const otpHash = await bcrypt.hash(otp, 10);

    // 8. OTP expires in 10 minutes
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 9. Store the hashed OTP
    await createVerification(user.id, otpHash, expiresAt);

    // TEMPORARY: We'll replace this with real email sending
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

    // 1. Validate input
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find the user
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4. Check whether user is already verified
    if (user.is_verified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // 5. Find the OTP record
    const verification = await findVerificationByUserId(user.id);

    if (!verification) {
      return res.status(400).json({
        message: "No verification code found. Please request a new OTP.",
      });
    }

    // 6. Check maximum attempts
    if (verification.attempts >= 5) {
      return res.status(429).json({
        message: "Too many failed attempts. Please request a new OTP.",
      });
    }

    // 7. Check whether OTP has expired
    if (new Date() > new Date(verification.expires_at)) {
      await deleteVerification(user.id);

      return res.status(400).json({
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // 8. Compare entered OTP with stored hash
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

    // 9. Mark user as verified
    const verifiedUser = await verifyUser(user.id);

    // 10. Delete OTP after successful verification
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

const {
  sendVerificationOtp,
} = require("../services/emailService");

async function resendOtp(req, res) {
  try {
    const { email } = req.body;

    // 1. Validate input
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // 2. Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // 3. Find user
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 4. Already verified?
    if (user.is_verified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    // 5. Check existing OTP
    const existingVerification =
      await findVerificationByUserId(user.id);

    // 6. Enforce 60-second cooldown
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

    // 7. Generate new OTP
    const otp = generateOtp();

    // 8. Hash new OTP
    const otpHash = await bcrypt.hash(otp, 10);

    // 9. New 10-minute expiry
    const expiresAt = new Date(
      Date.now() + 10 * 60 * 1000
    );

    // 10. Replace old OTP with new OTP
    await createVerification(
      user.id,
      otpHash,
      expiresAt
    );

    // 11. Send new OTP
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

module.exports = {
  register,
  verifyOtp,
  resendOtp,
};