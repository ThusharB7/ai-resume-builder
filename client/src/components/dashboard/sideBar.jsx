import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const mainLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "My Resumes",
    icon: FileText,
    path: "/resume",
  },
  {
    title: "AI Builder",
    icon: Sparkles,
    path: "/resume/new",
  },
];

const accountLinks = [
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
            ⚡
          </div>

          <div>
           <h1 className="text-lg font-bold text-white">
  CVPilot
</h1>

<p className="text-sm text-zinc-400">
  Your AI Career Copilot
</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Main
        </p>

        <div className="space-y-2">
          {mainLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border border-violet-500/40 bg-violet-500/10 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="transition group-hover:scale-110"
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </div>

        <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Account
        </p>

        <div className="space-y-2">
          {accountLinks.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border border-violet-500/40 bg-violet-500/10 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="transition group-hover:scale-110"
                />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* User Card */}
      <div className="border-t border-zinc-800 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl bg-zinc-900 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 font-bold text-white">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-white">
              {user?.name}
            </p>

            <p className="truncate text-sm text-zinc-400">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 font-medium text-zinc-300 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}