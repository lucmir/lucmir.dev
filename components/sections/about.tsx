import { SectionHeading } from "@/components/section-heading";
import { about } from "@/lib/cv-data";

export function About() {
  return (
    <section
      id="about"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-8">
        <SectionHeading label="// about" title="A short introduction" />
        <div className="space-y-4 text-base sm:text-lg text-foreground-muted leading-relaxed">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="flex items-start gap-3 p-4 rounded-md border border-border bg-background-elevated">
          <span
            aria-hidden
            className="mt-1.5 inline-block size-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.7)] animate-pulse shrink-0"
          />
          <div className="space-y-1">
            <p className="font-mono text-xs text-foreground-subtle uppercase tracking-wider">
              Currently
            </p>
            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              {about.currently}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
