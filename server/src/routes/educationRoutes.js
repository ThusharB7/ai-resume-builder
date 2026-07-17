const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/educationController");

router.post(
  "/resumes/:resumeId/education",
  authMiddleware,
  create
);

router.get(
  "/resumes/:resumeId/education",
  authMiddleware,
  getAll
);

router.put(
  "/education/:educationId",
  authMiddleware,
  update
);

router.delete(
  "/education/:educationId",
  authMiddleware,
  remove
);

module.exports = router;