const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { generateContent } = require("../controllers/aiController");

console.log("authMiddleware:", typeof authMiddleware);
console.log("generateContent:", typeof generateContent);

router.post("/generate", authMiddleware, generateContent);

module.exports = router;