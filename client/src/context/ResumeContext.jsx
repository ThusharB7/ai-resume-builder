import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

const initialResume = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    linkedin: "",
    github: "",
  },

  summary: "",

  education: [],

  experience: [],

  skills: [],

  projects: [],

  certifications: [],

  languages: [],
};

export function ResumeProvider({ children }) {
  const [resume, setResume] = useState(initialResume);

  const updateSection = (section, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}