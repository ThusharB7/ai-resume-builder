import { useState } from "react";
import { useResume } from "@/context/ResumeContext";

export default function SkillsForm() {
  const { resume, updateSection } = useResume();

  const [skill, setSkill] = useState("");

  const addSkill = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const value = skill.trim();

    if (!value) return;

    if (resume.skills.includes(value)) {
      setSkill("");
      return;
    }

    updateSection("skills", [...resume.skills, value]);

    setSkill("");
  };

  const removeSkill = (index) => {
    updateSection(
      "skills",
      resume.skills.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">
          Skills
        </h2>

        <p className="text-sm text-zinc-400">
          Press Enter after typing a skill.
        </p>
      </div>

      <input
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500"
        placeholder="React"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        onKeyDown={addSkill}
      />

      <div className="flex flex-wrap gap-2">
        {resume.skills.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm text-white"
          >
            {item}

            <button
              onClick={() => removeSkill(index)}
              className="font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}