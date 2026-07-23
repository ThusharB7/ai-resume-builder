import api from "./api";

export const createResume = (data) =>
  api.post("/resumes", data);

export const getResumes = () =>
  api.get("/resumes");

export const getResume = (id) =>
  api.get(`/resumes/${id}`);

export const updateResume = (id, data) =>
  api.put(`/resumes/${id}`, data);

export const deleteResume = (id) =>
  api.delete(`/resumes/${id}`);