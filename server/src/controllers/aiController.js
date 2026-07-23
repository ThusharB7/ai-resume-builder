
const { generateAIResponse } = require("../services/aiService");

const generateContent = async (req, res) => {
 console.log("🔥 AI endpoint hit");
  console.log("Body:", req.body);

  try {
    const { type, data } = req.body;

    let prompt = "";

    switch (type) {
      case "summary":
        prompt = `
You are a professional resume writer.

Generate a concise ATS-friendly professional summary.

Resume Information:
${JSON.stringify(data, null, 2)}

Only return the summary.
`;
        break;

      case "experience":
        prompt = `
Write 5 professional resume bullet points using action verbs.

Job Information:
${JSON.stringify(data, null, 2)}

Only return bullet points.
`;
        break;

      case "projects":
        prompt = `
Improve this project description for a software engineering resume.

Project:
${JSON.stringify(data, null, 2)}

Return only the improved description.
`;
        break;

      case "skills":
        prompt = `
Suggest the best technical and soft skills based on this resume.

Resume:
${JSON.stringify(data, null, 2)}

Return only a comma-separated list.
`;
        break;

      case "ats":
        prompt = `
Review this resume for ATS compatibility.

Resume:
${JSON.stringify(data, null, 2)}

Return:
- ATS Score (/100)
- Strengths
- Weaknesses
- Improvements
`;
        break;

      case "interview":
        prompt = `
Generate 10 interview questions based on this resume.

Resume:
${JSON.stringify(data, null, 2)}

Only return numbered questions.
`;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid AI request type",
        });
    }

    const result = await generateAIResponse(prompt);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
  success: false,
  error: error.response?.data || error.message,
});
  }
};

module.exports = {
  generateContent,
};