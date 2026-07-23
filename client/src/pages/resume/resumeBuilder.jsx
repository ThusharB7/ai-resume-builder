import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";

import ResumeSidebar from "@/pages/resume/ResumeSidebar";
import PersonalInfoForm from "@/pages/resume/PersonalInfoForm";
import EducationForm from "@/pages/resume/EducationForm";
import ExperienceForm from "@/pages/resume/ExperienceForm";
import SkillsForm from "@/pages/resume/SkillsForm";
import ProjectsForm from "@/pages/resume/ProjectsForm";

import ResumePreview from "@/preview/ResumePreview";
import ResumePDF from "@/pdf/ResumePDF";

import {
  createResume,
  updateResume,
} from "@/services/resumeService";

import { useResume } from "@/context/ResumeContext";
 export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("Personal");

  const {
    resume,
    resumeId,
    setResumeId,
  } = useResume();

  const handleSave = async () => {
    try {
      if (!resume.personal.fullName.trim()) {
        toast.error("Please enter your full name.");
        return;
      }

      const title = `${resume.personal.fullName}'s Resume`;

      if (!resumeId) {
        const response = await createResume({
          title,
        });

        const newResumeId = response.data.resume.id;

        setResumeId(newResumeId);

        await updateResume(newResumeId, {
          title,
          template: "modern",
          status: "draft",
          resume_data: resume,
        });

        toast.success("Resume saved successfully!");
      } else {
        await updateResume(resumeId, {
          title,
          template: "modern",
          status: "draft",
          resume_data: resume,
        });

        toast.success("Resume updated successfully!");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save resume."
      );
    }
  };
    return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Resume Builder
          </h1>

          <p className="text-zinc-400">
            Build your ATS-friendly resume with live preview.
          </p>
        </div>

        <div className="flex gap-3">
          <PDFDownloadLink
            document={<ResumePDF resume={resume} />}
            fileName={`${
              resume.personal.fullName?.trim() || "Resume"
            }.pdf`}
          >
            {({ loading }) => (
              <button
                disabled={loading}
                className="rounded-xl bg-green-600 px-5 py-2 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Download PDF"}
              </button>
            )}
          </PDFDownloadLink>

          <button
            onClick={handleSave}
            className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Save Resume
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-5">
        <div className="space-y-6 xl:col-span-2">
          <ResumeSidebar
            active={activeSection}
            setActive={setActiveSection}
          />

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            {activeSection === "Personal" && <PersonalInfoForm />}
            {activeSection === "Education" && <EducationForm />}
            {activeSection === "Experience" && <ExperienceForm />}
            {activeSection === "Skills" && <SkillsForm />}
            {activeSection === "Projects" && <ProjectsForm />}
          </div>
        </div>

        <div className="overflow-auto rounded-3xl bg-zinc-200 p-8 xl:col-span-3">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}