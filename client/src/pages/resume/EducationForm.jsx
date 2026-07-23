import { useResume } from "@/context/ResumeContext";

export default function EducationForm() {
  const { resume, addItem, updateItem, removeItem } = useResume();

  const newEducation = {
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
    grade: "",
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Education
        </h2>

        <button
          type="button"
          onClick={() => addItem("education", newEducation)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500"
        >
          + Add Education
        </button>
      </div>

      {resume.education.map((edu, index) => (
        <div
          key={index}
          className="space-y-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5"
        >
          <input
            className={inputClass}
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              updateItem("education", index, "degree", e.target.value)
            }
          />

          <input
            className={inputClass}
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) =>
              updateItem("education", index, "institution", e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Start Year"
              value={edu.startDate}
              onChange={(e) =>
                updateItem("education", index, "startDate", e.target.value)
              }
            />

            <input
              className={inputClass}
              placeholder="End Year"
              value={edu.endDate}
              onChange={(e) =>
                updateItem("education", index, "endDate", e.target.value)
              }
            />
          </div>

          <input
            className={inputClass}
            placeholder="CGPA / Percentage"
            value={edu.grade}
            onChange={(e) =>
              updateItem("education", index, "grade", e.target.value)
            }
          />

          {resume.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem("education", index)}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}