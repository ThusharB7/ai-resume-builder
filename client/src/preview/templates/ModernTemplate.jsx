import { forwardRef } from "react";

const ModernTemplate = forwardRef(({ resume }, ref) => {
  const { personal, summary } = resume;

  return (
    <div className="w-full">
      <div
        ref={ref}
        className="mx-auto min-h-[1123px] w-[794px] bg-white p-10 text-black"
      >
        {/* ================= HEADER ================= */}

        <header className="border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold tracking-wide">
            {personal.fullName || "Your Name"}
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            {personal.jobTitle || "Professional Title"}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
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
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {personal.github && (
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
          </div>
        </header>

        {/* ================= SUMMARY ================= */}

        <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Professional Summary
          </h2>

          <p className="leading-7 text-gray-700">
            {summary ||
              "Write a professional summary to introduce yourself."}
          </p>
        </section>

        {/* ================= EDUCATION ================= */}
                <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Education
          </h2>

          {resume.education.map((edu, index) => (
            <div key={index} className="mb-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree || "Degree"}
                  </h3>

                  <p className="text-gray-700">
                    {edu.institution}
                  </p>
                </div>

                <div className="text-right">
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-sm text-gray-500">
                      {edu.startDate}
                      {edu.startDate &&
                        edu.endDate &&
                        " - "}
                      {edu.endDate}
                    </p>
                  )}

                  {edu.grade && (
                    <p className="text-sm text-gray-500">
                      Grade: {edu.grade}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ================= EXPERIENCE ================= */}

        <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Experience
          </h2>

          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">
                    {exp.position || "Position"}
                  </h3>

                  <p className="text-gray-700">
                    {exp.company}
                  </p>
                </div>

                <div className="text-right">
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-sm text-gray-500">
                      {exp.startDate}
                      {exp.startDate &&
                        exp.endDate &&
                        " - "}
                      {exp.endDate}
                    </p>
                  )}
                </div>
              </div>

              {exp.description && (
                <div className="mt-3 space-y-1">
                  {exp.description
                    .split("\n")
                    .filter(
                      (line) =>
                        line.trim() !== ""
                    )
                    .map((line, i) => (
                      <p
                        key={i}
                        className="text-gray-700"
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
                <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="rounded bg-gray-200 px-3 py-1 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ================= PROJECTS ================= */}

        <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Projects
          </h2>

          {resume.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">
                {project.title || "Project Title"}
              </h3>

              {project.description && (
                <p className="mt-2 text-gray-700">
                  {project.description}
                </p>
              )}

              {project.technologies && (
                <p className="mt-2 text-sm">
                  <strong>Tech Stack:</strong>{" "}
                  {project.technologies}
                </p>
              )}

              <div className="mt-2 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;