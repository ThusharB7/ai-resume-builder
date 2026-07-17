const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  create,
  getAll,
  update,
  remove,
} = require("../controllers/skillController");

router.post(
  "/resumes/:resumeId/skills",
  authMiddleware,
  create
);

router.get(
  "/resumes/:resumeId/skills",
  authMiddleware,
  getAll
);

router.put(
  "/skills/:skillId",
  authMiddleware,
  update
);

router.delete(
  "/skills/:skillId",
  authMiddleware,
  remove
);

module.exports = router;