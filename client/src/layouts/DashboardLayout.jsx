import { Outlet } from "react-router-dom";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#09090B] text-white">

      {/* Background Glow */}

      <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-200px] bottom-[-150px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[180px]" />

      <Sidebar />

      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}