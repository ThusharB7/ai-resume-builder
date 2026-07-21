import { FileText, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentResumes() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Resumes
          </h2>

          <p className="mt-2 text-zinc-400">
            Your latest resumes will appear here.
          </p>
        </div>

        <button className="rounded-xl border border-violet-500 bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500">
          View All
        </button>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <div className="rounded-full bg-violet-600/10 p-6">
          <FileText
            size={52}
            className="text-violet-400"
          />
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-white">
          No resumes yet
        </h3>

        <p className="mt-2 max-w-md text-center text-zinc-400">
          Create your first AI-powered ATS resume and it will
          appear here.
        </p>

        <button className="mt-8 flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500">
          <Plus size={18} />
          Create Resume
        </button>
      </div>
    </motion.div>
  );
}