import {
  FileText,
  Sparkles,
  Download,
  Plus,
  ArrowRight,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentResumes from "@/components/dashboard/recentResumes";
import QuickActions from "@/components/dashboard/quickActions";



const stats = [
  {
    title: "Total Resumes",
    value: "0",
    subtitle: "No resumes created",
    icon: FileText,
    color: "violet",
  },
  {
    title: "AI Generations",
    value: "0",
    subtitle: "Generate with AI",
    icon: Sparkles,
    color: "blue",
  },
  {
    title: "Downloads",
    value: "0",
    subtitle: "PDF exports",
    icon: Download,
    color: "emerald",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-600 p-8 lg:p-10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-200">
            CVPILOT
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight text-white lg:text-5xl">
            Your AI Career Copilot.
          </h1>

          <p className="mt-5 text-lg leading-8 text-violet-100">
            Generate ATS-friendly resumes, optimize them with AI,
            export beautiful PDFs and land your dream job.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-zinc-900 transition-all hover:scale-105 active:scale-95">
              <Plus size={18} />
              Create Resume
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-white backdrop-blur transition hover:bg-white/20">
              Learn More
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-3">
        {stats.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </section>

      {/* Bottom Section */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentResumes />
        </div>

        <QuickActions />
      </section>
    </div>
  );
}