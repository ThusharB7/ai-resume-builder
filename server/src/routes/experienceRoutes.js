const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/experienceController");

router.post(
  "/resumes/:resumeId/experience",
  authMiddleware,
  create
);

router.get(
  "/resumes/:resumeId/experience",
  authMiddleware,
  getAll
);

router.put(
  "/experience/:experienceId",
  authMiddleware,
  update
);

router.delete(
  "/experience/:experienceId",
  authMiddleware,
  remove
);

module.exports = router;