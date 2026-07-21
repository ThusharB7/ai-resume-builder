import { Bell, Search, Moon } from "lucide-react";

export default function Navbar() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-zinc-800 bg-[#09090B]/80 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {greeting} 👋
        </h1>

        <p className="mt-1 text-zinc-400">
          Let's build your next ATS-friendly resume.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-500 hover:bg-zinc-800">
          <Search
            className="text-zinc-300"
            size={18}
          />
        </button>

        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-500 hover:bg-zinc-800">
          <Bell
            className="text-zinc-300"
            size={18}
          />
        </button>

        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-500 hover:bg-zinc-800">
          <Moon
            className="text-zinc-300"
            size={18}
          />
        </button>
      </div>
    </header>
)}