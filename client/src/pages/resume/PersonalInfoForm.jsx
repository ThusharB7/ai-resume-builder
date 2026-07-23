import { useState } from "react";
import { toast } from "sonner";

import { useResume } from "@/context/ResumeContext";
import { generateSummary } from "@/services/aiService";

export default function PersonalInfoForm() {
  const { resume, updateSection } = useResume();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    updateSection("personal", {
      ...resume.personal,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateSummary = async () => {
    try {
      setLoading(true);

      const summary = await generateSummary(resume);

      updateSection("summary", summary);

      toast.success("Professional summary generated!");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.error ||
          "Failed to generate summary."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-zinc-400">
          This information appears at the top of your resume.
        </p>
      </div>

      {/* Personal Inputs */}
      <div className="grid gap-4">
        <input
          className={inputClass}
          placeholder="Full Name"
          name="fullName"
          value={resume.personal.fullName}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          placeholder="Professional Title"
          name="jobTitle"
          value={resume.personal.jobTitle}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Email"
            name="email"
            value={resume.personal.email}
            onChange={handleChange}
          />

          <input
            className={inputClass}
            placeholder="Phone"
            name="phone"
            value={resume.personal.phone}
            onChange={handleChange}
          />
        </div>

        <input
          className={inputClass}
          placeholder="Location"
          name="location"
          value={resume.personal.location}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          placeholder="LinkedIn"
          name="linkedin"
          value={resume.personal.linkedin}
          onChange={handleChange}
        />

        <input
          className={inputClass}
          placeholder="GitHub"
          name="github"
          value={resume.personal.github}
          onChange={handleChange}
        />
      </div>

      {/* AI Summary */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-zinc-300">
          Professional Summary
        </label>

        <button
          type="button"
          onClick={handleGenerateSummary}
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating Summary..." : "✨ Generate AI Summary"}
        </button>

        <textarea
          rows={6}
          value={resume.summary}
          onChange={(e) => updateSection("summary", e.target.value)}
          placeholder="Tell recruiters about yourself..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>
    </div>
  );
}