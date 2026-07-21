import { Plus, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeList() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            My Resumes
          </h1>

          <p className="mt-2 text-zinc-400">
            Create, edit and manage all your resumes.
          </p>
        </div>

        <button
          onClick={() => navigate("/resume/new")}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          <Plus size={18} />
          New Resume
        </button>
      </div>

      {/* Empty State */}
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/70">
        <div className="rounded-full bg-violet-500/10 p-6">
          <FileText
            size={52}
            className="text-violet-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-white">
          No resumes yet
        </h2>

        <p className="mt-3 max-w-md text-center text-zinc-400">
          Create your first ATS-friendly resume with AI in
          minutes.
        </p>

        <button
          onClick={() => navigate("/resume/new")}
          className="mt-8 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500"
        >
          Create Resume
        </button>
      </div>
    </div>
  );
}