const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/projectController");

// Create Project
router.post(
  "/resumes/:resumeId/projects",
  authMiddleware,
  create
);

// Get All Projects for a Resume
router.get(
  "/resumes/:resumeId/projects",
  authMiddleware,
  getAll
);

// Update Project
router.put(
  "/projects/:projectId",
  authMiddleware,
  update
);

// Delete Project
router.delete(
  "/projects/:projectId",
  authMiddleware,
  remove
);

module.exports = router;