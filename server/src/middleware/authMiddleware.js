const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header is missing",
      });
    }

    // Expected format:
    // Bearer <token>
    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store authenticated user info
    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await pool.query(
      `SELECT id,name,email,is_verified
       FROM users
       WHERE id=$1`,
      [userId]
    );

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = authMiddleware;