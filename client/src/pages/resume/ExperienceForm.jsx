import { useResume } from "@/context/ResumeContext";

export default function ExperienceForm() {
  const { resume, addItem, updateItem, removeItem } = useResume();

  const newExperience = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Experience
        </h2>

        <button
          type="button"
          onClick={() => addItem("experience", newExperience)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500"
        >
          + Add Experience
        </button>
      </div>

      {resume.experience.map((exp, index) => (
        <div
          key={index}
          className="space-y-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5"
        >
          <input
            className={inputClass}
            placeholder="Company"
            value={exp.company}
            onChange={(e) =>
              updateItem("experience", index, "company", e.target.value)
            }
          />

          <input
            className={inputClass}
            placeholder="Position"
            value={exp.position}
            onChange={(e) =>
              updateItem("experience", index, "position", e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className={inputClass}
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) =>
                updateItem("experience", index, "startDate", e.target.value)
              }
            />

            <input
              className={inputClass}
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) =>
                updateItem("experience", index, "endDate", e.target.value)
              }
            />
          </div>

          <textarea
            rows={5}
            className={inputClass}
            placeholder="Describe your responsibilities and achievements..."
            value={exp.description}
            onChange={(e) =>
              updateItem("experience", index, "description", e.target.value)
            }
          />

          {resume.experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem("experience", index)}
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