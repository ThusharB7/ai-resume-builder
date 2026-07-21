export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-xl bg-blue-50 p-3">
            <Icon className="text-blue-600" size={24} />
          </div>
        )}
      </div>
    </div>
  );
}