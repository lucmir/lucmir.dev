import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/cv-data";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDuration(duration: string, now: Date) {
  const [start, end] = duration.split(/\s*[—–-]\s*/);
  const startMatch = start.match(/(\w+)\s+(\d{4})/);
  if (!startMatch) return null;
  const startMonth = MONTHS.indexOf(startMatch[1]);
  const startYear = Number.parseInt(startMatch[2], 10);
  const startDate = new Date(startYear, Math.max(0, startMonth), 1);

  let endDate: Date;
  if (end?.toLowerCase().includes("present")) {
    endDate = now;
  } else {
    const endMatch = end?.match(/(\w+)\s+(\d{4})/);
    if (!endMatch) return null;
    const endMonth = MONTHS.indexOf(endMatch[1]);
    const endYear = Number.parseInt(endMatch[2], 10);
    endDate = new Date(endYear, Math.max(0, endMonth), 1);
  }

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.max(1, Math.round(months / 12));
  return { startYear, years };
}

export function Experience() {
  const now = new Date();

  return (
    <section
      id="experience"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-12">
        <SectionHeading label="// experience" title="Where I've built things" />
        <ol className="relative border-l border-border pl-10 sm:pl-14 space-y-12">
          {experience.map((job, i) => {
            const parsed = parseDuration(job.duration, now);
            return (
              <li key={i} className="relative">
                <div
                  aria-hidden
                  className="absolute -left-[58px] sm:-left-[74px] top-0 flex flex-col items-center gap-1.5"
                >
                  {parsed ? (
                    <span className="font-mono text-[10px] text-foreground-subtle tabular-nums">
                      {parsed.startYear}
                    </span>
                  ) : null}
                  <span className="size-9 rounded-md bg-background-elevated border border-border flex items-center justify-center font-mono text-xs font-medium text-foreground-muted overflow-hidden">
                    {job.logo ? (
                      <Image
                        src={job.logo}
                        alt=""
                        width={64}
                        height={64}
                        className="size-7 object-contain"
                      />
                    ) : (
                      job.monogram
                    )}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                      {job.role}
                    </h3>
                    <p className="text-base text-foreground-muted">
                      <span className="text-foreground">{job.company}</span>
                      <span className="font-mono text-sm text-foreground-subtle ml-2">
                        · {job.duration}
                        {parsed ? ` (${parsed.years}y)` : ""}
                      </span>
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
            );
          })}
        </ol>
      </div>
    </section>
  );
}
