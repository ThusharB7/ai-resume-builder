export default function AuthHeader({
  title,
  subtitle,
}) {
  return (
    <div className="space-y-3 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>

      <p className="text-sm leading-6 text-muted-foreground md:text-base">
        {subtitle}
      </p>
    </div>
  );
}