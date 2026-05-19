import { Hash } from "lucide-react";

export function SectionHeading({
  label,
  title,
  anchorId,
}: {
  label: string;
  title: string;
  anchorId?: string;
}) {
  return (
    <div className="space-y-2 group">
      <p className="font-mono text-sm text-accent">{label}</p>
      <div className="flex items-center gap-3">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {title}
        </h2>
        {anchorId ? (
          <a
            href={`#${anchorId}`}
            aria-label={`Link to ${title} section`}
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-foreground-subtle hover:text-accent focus:outline-none focus-visible:text-accent"
          >
            <Hash className="size-6" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
