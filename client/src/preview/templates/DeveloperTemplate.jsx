import { forwardRef } from "react";

const DeveloperTemplate = forwardRef(({ resume }, ref) => {
  const { personal, summary } = resume;

  return (
    <div className="w-full bg-slate-100 p-6">
      <div
        ref={ref}
        className="mx-auto flex min-h-[1123px] w-[794px] overflow-hidden bg-white shadow-lg"
      >
        {/* ================= SIDEBAR ================= */}

        <aside className="w-64 bg-slate-900 p-8 text-white">
          <h1 className="text-3xl font-bold leading-tight">
            {personal.fullName || "Your Name"}
          </h1>

          <p className="mt-2 text-sm uppercase tracking-widest text-cyan-400">
            {personal.jobTitle || "Developer"}
          </p>

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Contact
            </h2>

            <div className="space-y-3 text-sm text-slate-300">
              {personal.email && <p>{personal.email}</p>}

              {personal.phone && <p>{personal.phone}</p>}

              {personal.location && (
                <p>{personal.location}</p>
              )}

              {personal.linkedin && (
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="block break-all hover:text-cyan-300"
                >
                  LinkedIn
                </a>
              )}

              {personal.github && (
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="block break-all hover:text-cyan-300"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}

        <main className="flex-1 p-10">
          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              About Me
            </h2>

            <p className="leading-8 text-gray-700">
              {summary ||
                "Write a short summary highlighting your technical skills, projects, and career goals."}
            </p>
          </section>

          {/* ================= EDUCATION ================= */}

          <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Education
            </h2>

            {resume.education.map((edu, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-slate-200 p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {edu.degree || "Degree"}
                    </h3>

                    <p className="mt-1 text-gray-600">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    {(edu.startDate || edu.endDate) && (
                      <p>
                        {edu.startDate}
                        {edu.startDate &&
                          edu.endDate &&
                          " – "}
                        {edu.endDate}
                      </p>
                    )}

                    {edu.grade && (
                      <p className="mt-1">
                        Grade: {edu.grade}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* ================= EXPERIENCE ================= */}
                    <section className="mb-10">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Experience
            </h2>

            {resume.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-slate-200 p-5"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {exp.position || "Position"}
                    </h3>

                    <p className="mt-1 text-gray-600">
                      {exp.company}
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    {(exp.startDate || exp.endDate) && (
                      <p>
                        {exp.startDate}
                        {exp.startDate &&
                          exp.endDate &&
                          " – "}
                        {exp.endDate}
                      </p>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <div className="mt-4 space-y-2">
                    {exp.description
                      .split("\n")
                      .filter(
                        (line) =>
                          line.trim() !== ""
                      )
                      .map((line, i) => (
                        <p
                          key={i}
                          className="leading-7 text-gray-700"
                        >
                          • {line}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* ================= PROJECTS ================= */}

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Featured Projects
            </h2>

            {resume.projects.map((project, index) => (
              <div
                key={index}
                className="mb-8 rounded-xl border-l-4 border-cyan-500 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {project.title || "Project Title"}
                  </h3>

                  {project.technologies && (
                    <span className="rounded bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
                      {project.technologies}
                    </span>
                  )}
                </div>

                {project.description && (
                  <p className="mt-4 leading-7 text-gray-700">
                    {project.description}
                  </p>
                )}

                {(project.github || project.live) && (
                  <div className="mt-5 flex gap-5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-slate-900 px-4 py-2 text-sm text-white transition hover:bg-slate-800"
                      >
                        GitHub
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-700"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
                  </main>
      </div>
    </div>
  );
});

DeveloperTemplate.displayName = "DeveloperTemplate";

export default DeveloperTemplate;