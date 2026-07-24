import { forwardRef } from "react";

const ExecutiveTemplate = forwardRef(({ resume }, ref) => {
  const { personal, summary } = resume;

  return (
    <div className="w-full bg-gray-100 p-6">
      <div
        ref={ref}
        className="mx-auto min-h-[1123px] w-[794px] bg-white shadow-lg"
      >
        {/* ================= HEADER ================= */}

        <header className="bg-slate-900 px-12 py-10 text-white">
          <h1 className="text-4xl font-bold tracking-wide">
            {personal.fullName || "Your Name"}
          </h1>

          <p className="mt-2 text-lg text-slate-300">
            {personal.jobTitle || "Professional Title"}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-y-2 text-sm text-slate-200">
            {personal.email && <span>{personal.email}</span>}

            {personal.phone && <span>{personal.phone}</span>}

            {personal.location && (
              <span>{personal.location}</span>
            )}

            {personal.linkedin && (
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            )}

            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </header>

        <div className="px-12 py-10">
          {/* ================= SUMMARY ================= */}

          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-slate-900 pl-3 text-xl font-bold uppercase tracking-wide">
              Executive Summary
            </h2>

            <p className="leading-8 text-gray-700">
              {summary ||
                "Write a concise executive summary highlighting your experience, leadership, and achievements."}
            </p>
          </section>

          {/* ================= EDUCATION ================= */}

          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-slate-900 pl-3 text-xl font-bold uppercase tracking-wide">
              Education
            </h2>

            {resume.education.map((edu, index) => (
              <div
                key={index}
                className="mb-7 border-b border-gray-200 pb-5 last:border-0"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
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
            <h2 className="mb-4 border-l-4 border-slate-900 pl-3 text-xl font-bold uppercase tracking-wide">
              Professional Experience
            </h2>

            {resume.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-8 border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
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

          {/* ================= SKILLS ================= */}

          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-slate-900 pl-3 text-xl font-bold uppercase tracking-wide">
              Core Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* ================= PROJECTS ================= */}

          <section className="mb-10">
            <h2 className="mb-4 border-l-4 border-slate-900 pl-3 text-xl font-bold uppercase tracking-wide">
              Key Projects
            </h2>
                        {resume.projects.map((project, index) => (
              <div
                key={index}
                className="mb-8 border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {project.title || "Project Title"}
                </h3>

                {project.description && (
                  <p className="mt-3 leading-7 text-gray-700">
                    {project.description}
                  </p>
                )}

                {project.technologies && (
                  <p className="mt-3 text-sm text-gray-600">
                    <span className="font-semibold">
                      Technologies:
                    </span>{" "}
                    {project.technologies}
                  </p>
                )}

                {(project.github || project.live) && (
                  <div className="mt-4 flex gap-6 text-sm">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-800 hover:underline"
                      >
                        GitHub
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-slate-800 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
});

ExecutiveTemplate.displayName = "ExecutiveTemplate";

export default ExecutiveTemplate;