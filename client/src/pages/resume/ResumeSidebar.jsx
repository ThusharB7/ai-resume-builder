const sections = [
  "Personal",
  "Education",
  "Experience",
  "Skills",
  "Projects",
];

export default function ResumeSidebar({ active, setActive }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <h2 className="mb-5 text-xl font-bold text-white">
        Resume Sections
      </h2>

      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActive(section)}
            className={`w-full rounded-xl px-4 py-3 text-left transition ${
              active === section
                ? "bg-violet-600 text-white"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
}