import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { education } from "@/lib/cv-data";

export function Education() {
  return (
    <section
      id="education"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-8">
        <SectionHeading
          label="// education"
          title="Where I learned the fundamentals"
          anchorId="education"
        />
        <ul className="space-y-4">
          {education.map((e, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-5 rounded-md border border-border bg-background-elevated"
            >
              <GraduationCap className="size-5 text-accent mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-lg font-medium text-foreground">
                  {e.degree} · {e.field}
                </p>
                <p className="text-foreground-muted">{e.school}</p>
                <p className="font-mono text-sm text-foreground-subtle">
                  {e.duration}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
