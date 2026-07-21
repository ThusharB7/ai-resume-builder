import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "violet",
}) {
  const colors = {
    violet: "from-violet-500/20 to-violet-700/10 text-violet-400",
    blue: "from-blue-500/20 to-blue-700/10 text-blue-400",
    emerald: "from-emerald-500/20 to-emerald-700/10 text-emerald-400",
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="group rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`rounded-2xl bg-gradient-to-br p-4 ${colors[color]}`}
        >
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}