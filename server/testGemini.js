require("dotenv").config();
const axios = require("axios");

async function testGemini() {
  console.log("API Key:", process.env.GEMINI_API_KEY);

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        contents: [
          {
            parts: [
              {
                text: "Say hello in one sentence.",
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    console.log("\nSUCCESS:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.log("\nERROR");

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log(JSON.stringify(err.response.data, null, 2));
    } else {
      console.log(err.message);
    }
  }
}

testGemini();