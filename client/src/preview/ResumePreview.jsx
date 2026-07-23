import { useResume } from "@/context/ResumeContext";

export default function ResumePreview() {
  const { resume } = useResume();

  const { personal, summary } = resume;

  return (
    <div className="sticky top-6">
      <div className="mx-auto min-h-[1123px] max-w-[794px] rounded-lg bg-white p-10 text-black shadow-2xl">
        {/* Header */}
        <header className="border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold">
            {personal.fullName || "Your Name"}
          </h1>

          <p className="mt-2 text-lg text-gray-600">
            {personal.jobTitle || "Professional Title"}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-700">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.github && <span>{personal.github}</span>}
          </div>
        </header>

        <section className="mt-8">
          <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase tracking-wide">
            Professional Summary
          </h2>

          <p className="leading-7 text-gray-700">
            {summary ||
              "Write a professional summary to introduce yourself."}
          </p>
        </section>

        <section className="mt-8">
  <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase">
    Education
  </h2>

  {resume.education.map((edu, index) => (
    <div key={index} className="mb-4">
      <h3 className="font-semibold">{edu.degree}</h3>

      <p className="text-gray-700">
        {edu.institution}
      </p>

      <p className="text-sm text-gray-500">
        {edu.startDate} - {edu.endDate}
      </p>

      <p className="text-sm">
        {edu.grade}
      </p>
    </div>
  ))}
</section>

<section className="mt-8">
  <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase">
    Experience
  </h2>

  {resume.experience.map((exp, index) => (
    <div key={index} className="mb-5">
      <h3 className="font-semibold">
        {exp.position}
      </h3>

      <p className="text-gray-700">
        {exp.company}
      </p>

      <p className="text-sm text-gray-500">
        {exp.startDate} - {exp.endDate}
      </p>

      <p className="mt-2 whitespace-pre-line text-gray-700">
        {exp.description}
      </p>
    </div>
  ))}
</section>


<section className="mt-8">
  <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase">
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

<section className="mt-8">
  <h2 className="mb-3 border-b pb-2 text-lg font-bold uppercase">
    Projects
  </h2>

  {resume.projects.map((project, index) => (
    <div key={index} className="mb-6">
      <h3 className="text-lg font-semibold">
        {project.title || "Project Title"}
      </h3>

      <p className="mt-2 text-gray-700">
        {project.description}
      </p>

      {project.technologies && (
        <p className="mt-2 text-sm">
          <strong>Tech:</strong> {project.technologies}
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-4 text-sm text-blue-600">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}

        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
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
}