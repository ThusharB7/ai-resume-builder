require("dotenv").config();

const express = require("express");
const cors = require("cors");

const pool = require("./src/config/db");

// Route imports
const authRoutes = require("./src/routes/authRoutes");
const resumeRoutes = require("./src/routes/resumeRoutes");
const educationRoutes = require("./src/routes/educationRoutes");
const experienceRoutes = require("./src/routes/experienceRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const skillRoutes = require("./src/routes/skillRoutes");
const aiRoutes = require("./src/routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Resume Builder API is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database connection successful");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
}

startServer();