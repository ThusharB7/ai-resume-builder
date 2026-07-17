const express = require("express");
const projectRoutes = require("./src/routes/projectRoutes");
const cors = require("cors");
require("dotenv").config();

const pool = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const resumeRoutes = require("./src/routes/resumeRoutes");
const educationRoutes = require("./src/routes/educationRoutes");
const app = express();
const experienceRoutes = require("./src/routes/experienceRoutes");
const skillRoutes = require("./src/routes/skillRoutes");

// Global middleware FIRST

app.use(cors());
app.use(express.json());

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api", educationRoutes);
app.use("/api", experienceRoutes);
app.use("/api", projectRoutes);
app.use("/api", skillRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Builder API is running",
  });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
    process.exit(1);
  }
}

startServer();