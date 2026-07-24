import { forwardRef } from "react";

const MinimalTemplate = forwardRef(({ resume }, ref) => {
  const { personal, summary } = resume;

  return (
    <div className="w-full">
      <div
        ref={ref}
        className="mx-auto min-h-[1123px] w-[794px] bg-white px-14 py-12 text-black"
      >
        {/* ================= HEADER ================= */}

        <header className="pb-8">
          <h1 className="text-5xl font-light tracking-wide text-gray-900">
            {personal.fullName || "Your Name"}
          </h1>

          <p className="mt-3 text-base tracking-[0.25em] uppercase text-gray-500">
            {personal.jobTitle || "Professional Title"}
          </p>

          <div className="mt-6 h-px w-full bg-gray-300" />

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
            {personal.email && (
              <span>{personal.email}</span>
            )}

            {personal.phone && (
              <span>{personal.phone}</span>
            )}

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

        {/* ================= SUMMARY ================= */}

        <section className="mb-10">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Professional Summary
          </h2>

          <p className="leading-8 text-gray-700">
            {summary ||
              "Write a professional summary to introduce yourself."}
          </p>
        </section>

        {/* ================= EDUCATION ================= */}
                <section className="mb-10">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Education
          </h2>

          {resume.education.map((edu, index) => (
            <div key={index} className="mb-7">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
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
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Experience
          </h2>

          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
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
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Skills
          </h2>

          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm text-gray-700"
              >
                {skill}
                {index !== resume.skills.length - 1 && " •"}
              </span>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section className="mb-10">
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-gray-500">
            Projects
          </h2>

          {resume.projects.map((project, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-lg font-medium text-gray-900">
                {project.title || "Project Title"}
              </h3>

              {project.description && (
                <p className="mt-2 leading-7 text-gray-700">
                  {project.description}
                </p>
              )}

              {project.technologies && (
                <p className="mt-3 text-sm text-gray-500">
                  <span className="font-medium">
                    Tech Stack:
                  </span>{" "}
                  {project.technologies}
                </p>
              )}

              {(project.github || project.live) && (
                <div className="mt-3 flex gap-5 text-sm">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      GitHub
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:underline"
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
  );
});

MinimalTemplate.displayName = "MinimalTemplate";

export default MinimalTemplate;