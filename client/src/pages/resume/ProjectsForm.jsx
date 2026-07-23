import { useResume } from "@/context/ResumeContext";

export default function ProjectsForm() {
  const { resume, addItem, updateItem, removeItem } = useResume();

  const newProject = {
    title: "",
    description: "",
    technologies: "",
    github: "",
    live: "",
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none focus:border-violet-500";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Projects
        </h2>

        <button
          type="button"
          onClick={() => addItem("projects", newProject)}
          className="rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500"
        >
          + Add Project
        </button>
      </div>

      {resume.projects.map((project, index) => (
        <div
          key={index}
          className="space-y-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-5"
        >
          <input
            className={inputClass}
            placeholder="Project Title"
            value={project.title}
            onChange={(e) =>
              updateItem("projects", index, "title", e.target.value)
            }
          />

          <textarea
            rows={4}
            className={inputClass}
            placeholder="Project Description"
            value={project.description}
            onChange={(e) =>
              updateItem("projects", index, "description", e.target.value)
            }
          />

          <input
            className={inputClass}
            placeholder="Technologies (React, Node.js, PostgreSQL)"
            value={project.technologies}
            onChange={(e) =>
              updateItem("projects", index, "technologies", e.target.value)
            }
          />

          <input
            className={inputClass}
            placeholder="GitHub URL"
            value={project.github}
            onChange={(e) =>
              updateItem("projects", index, "github", e.target.value)
            }
          />

          <input
            className={inputClass}
            placeholder="Live Demo URL"
            value={project.live}
            onChange={(e) =>
              updateItem("projects", index, "live", e.target.value)
            }
          />

          {resume.projects.length > 1 && (
            <button
              type="button"
              onClick={() => removeItem("projects", index)}
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