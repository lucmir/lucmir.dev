import { Award } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { certifications, skills } from "@/lib/cv-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-12">
        <SectionHeading label="// skills" title="What I work with" />

        <div className="space-y-4">
          <h3 className="font-mono text-sm text-foreground-subtle uppercase tracking-wider">
            AI &amp; Agents
          </h3>
          <ul className="flex flex-wrap gap-2">
            {skills.topTier.map((s) => (
              <li
                key={s}
                className="px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-sm font-medium"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="font-mono text-sm text-foreground-subtle uppercase tracking-wider">
            Foundation
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {skills.foundation.map((group) => (
              <div key={group.group} className="space-y-2">
                <dt className="text-sm font-mono text-foreground">
                  {group.group}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="px-2.5 py-1 rounded border border-border text-foreground-muted text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-sm text-foreground-subtle uppercase tracking-wider">
            Anthropic Certifications
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 p-3 rounded-md border border-border bg-background-elevated"
              >
                <Award className="size-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-foreground-muted">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
