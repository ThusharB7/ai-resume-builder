export default function PageHeading({
  title,
  subtitle,
}) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">
        {title}
      </h2>

      <p className="text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}