export function SectionHeading({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-sm text-accent">{label}</p>
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
