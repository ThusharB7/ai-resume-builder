import { FilePlus2, Sparkles, Download, LayoutTemplate } from "lucide-react";

const actions = [
  {
    title: "New Resume",
    description: "Start from scratch",
    icon: FilePlus2,
  },
  {
    title: "AI Generate",
    description: "Generate with AI",
    icon: Sparkles,
  },
  {
    title: "Templates",
    description: "Browse templates",
    icon: LayoutTemplate,
  },
  {
    title: "Export PDF",
    description: "Download resume",
    icon: Download,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Jump into your most common tasks.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ title, description, icon: Icon }) => (
          <button
            key={title}
            className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-left transition-all hover:border-violet-500 hover:bg-zinc-900"
          >
            <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-400">
              <Icon size={22} />
            </div>

            <h3 className="font-semibold text-white group-hover:text-violet-300">
              {title}
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              {description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}