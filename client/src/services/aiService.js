import api from "./api";

export const generateSummary = async (resumeData) => {
  const response = await api.post("/ai/generate", {
    type: "summary",
    data: resumeData,
  });

  return response.data.result;
};