import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

const initialResume = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },

  summary: "",

  education: [
    {
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      grade: "",
    },
  ],

  experience: [
    {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],

  skills: [],

  projects: [
    {
      title: "",
      description: "",
      technologies: "",
      github: "",
      live: "",
    },
  ],

  certifications: [
    {
      name: "",
      issuer: "",
      year: "",
    },
  ],

  languages: [
    {
      name: "",
      proficiency: "",
    },
  ],
};

export const ResumeProvider = ({ children }) => {
  const [resume, setResume] = useState(initialResume);
  const [resumeId, setResumeId] = useState(null);

  // NEW
  const [selectedTemplate, setSelectedTemplate] =
    useState("modern");

  // -----------------------------
  // Update non-array sections
  // -----------------------------

  const updateSection = (section, data) => {
    setResume((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // -----------------------------
  // Add item
  // -----------------------------

  const addItem = (section, newItem) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // -----------------------------
  // Update item
  // -----------------------------

  const updateItem = (
    section,
    index,
    field,
    value
  ) => {
    setResume((prev) => {
      const updated = [...prev[section]];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        [section]: updated,
      };
    });
  };

  // -----------------------------
  // Remove item
  // -----------------------------

  const removeItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter(
        (_, i) => i !== index
      ),
    }));
  };
    return (
    <ResumeContext.Provider
      value={{
        // Resume State
        resume,
        setResume,

        // Resume ID
        resumeId,
        setResumeId,

        // Selected Template
        selectedTemplate,
        setSelectedTemplate,

        // Helpers
        updateSection,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);