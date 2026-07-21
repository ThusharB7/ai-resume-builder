import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UserDropdown() {
  const { user, logout } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
          {initials}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {user?.name}
          </h3>

          <p className="text-sm text-zinc-400">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800">
          <User size={18} />
          Profile
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-zinc-800">
          <Settings size={18} />
          Settings
        </button>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}