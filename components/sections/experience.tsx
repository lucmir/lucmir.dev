import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/cv-data";

export function Experience() {
  return (
    <section
      id="experience"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-12">
        <SectionHeading label="// experience" title="Where I've built things" />
        <ol className="relative border-l border-border pl-10 sm:pl-14 space-y-12">
          {experience.map((job, i) => (
            <li key={i} className="relative">
              <span
                aria-hidden
                className="absolute -left-[36px] sm:-left-[52px] -top-1 size-9 rounded-md bg-background-elevated border border-border flex items-center justify-center font-mono text-xs font-medium text-foreground-muted"
              >
                {job.monogram}
              </span>
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                    {job.role}
                  </h3>
                  <p className="text-base text-foreground-muted">
                    <span className="text-foreground">{job.company}</span>
                    <span className="font-mono text-sm text-foreground-subtle ml-2">
                      · {job.duration}
                    </span>
                    {job.location ? (
                      <span className="font-mono text-sm text-foreground-subtle ml-2">
                        · {job.location}
                      </span>
                    ) : null}
                  </p>
                </div>
                {job.bullets.length > 0 ? (
                  <ul className="space-y-2 text-base text-foreground-muted leading-relaxed">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3">
                        <span
                          aria-hidden
                          className="text-accent font-mono select-none mt-1"
                        >
                          ›
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {job.stack ? (
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {job.stack.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-xs px-2 py-1 rounded border border-border text-foreground-muted"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
