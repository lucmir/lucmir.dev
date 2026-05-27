import Image from "next/image";
import { SectionHead } from "@/components/sections/about";
import { experience } from "@/lib/cv-data";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* Parse "Apr 2025 — Present" / "Nov 2018 — Apr 2025" / "Jan 2010 — Feb 2015"
   into { when: "2025 → Now", duration: "7 mo" | "6 yr 5 mo" } */
function parseRange(duration: string, now: Date) {
  const [startRaw, endRaw] = duration.split(/\s*[—–-]\s*/);
  const sm = startRaw?.match(/(\w+)\s+(\d{4})/);
  if (!sm) return { when: duration, duration: "" };
  const sMonth = MONTHS.indexOf(sm[1]);
  const sYear = Number.parseInt(sm[2], 10);
  const startDate = new Date(sYear, Math.max(0, sMonth), 1);

  const isPresent = !endRaw || /present|now/i.test(endRaw);
  let endDate: Date;
  let endYear: number | "Now";
  if (isPresent) {
    endDate = now;
    endYear = "Now";
  } else {
    const em = endRaw.match(/(\w+)\s+(\d{4})/);
    if (!em) return { when: duration, duration: "" };
    endDate = new Date(Number(em[2]), Math.max(0, MONTHS.indexOf(em[1])), 1);
    endYear = Number(em[2]);
  }

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const durStr =
    years > 0
      ? months > 0
        ? `${years} yr ${months} mo`
        : `${years} yr`
      : `${months} mo`;

  return { when: `${sYear} → ${endYear}`, duration: durStr };
}

/* Heuristic: wrap brand names like "Civic MCP" inside the bullet's leading
   bold prefix. Falls back to plain text when there's no prefix. */
function Bullet({ text }: { text: string }) {
  const m = text.match(/^([A-Z][A-Za-z0-9.+/ -]{2,30}?):\s+(.*)$/);
  if (m) {
    return (
      <li className="pl-[18px] relative">
        <span className="absolute left-0 text-accent font-mono">+</span>
        <b className="font-mono text-[13px] text-foreground-strong bg-background-card-hi px-1.5 border border-border-strong rounded-[2px]">
          {m[1]}
        </b>
        : {m[2]}
      </li>
    );
  }
  return (
    <li className="pl-[18px] relative">
      <span className="absolute left-0 text-accent font-mono">+</span>
      {text}
    </li>
  );
}

export function Experience() {
  const now = new Date();
  // Filter out internships / undergrad research from the changelog list
  // (still in cv-data; the catalog stays focused on shipped roles).
  const items = experience.filter((j) => j.bullets.length > 0);

  return (
    <section
      id="experience"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead idx="02" name="experience" aside={`${items.length} roles · descending`} />

      <div className="border border-border bg-background-card">
        {items.map((job, i) => {
          const { when, duration } = parseRange(job.duration, now);
          const isLast = i === items.length - 1;
          return (
            <article
              key={`${job.company}-${job.role}-${i}`}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr] ${isLast ? "" : "border-b border-border"}`}
            >
              <div className="p-5 md:border-r border-b md:border-b-0 border-border text-[11.5px] grid gap-2 content-start">
                <div className="font-mono text-accent text-[13px] font-medium">{when}</div>
                {duration ? (
                  <div className="text-foreground-subtle text-[10.5px] uppercase tracking-[0.08em]">
                    {duration}
                  </div>
                ) : null}
                {job.location ? (
                  <div className="text-foreground-muted">{job.location}</div>
                ) : null}
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-sans text-[17px] font-semibold text-foreground-strong tracking-[-0.005em] mb-0.5">
                  {job.role}
                </h3>
                <div className="font-mono text-[14px] text-foreground-muted mb-3.5 inline-flex items-center gap-2">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      alt=""
                      width={40}
                      height={40}
                      className="size-5 object-contain opacity-90"
                    />
                  ) : null}
                  {job.company}
                </div>

                <ul className="grid gap-1.5 font-sans text-[14.5px] leading-[1.55] text-foreground m-0 p-0 list-none">
                  {job.bullets.map((b, bi) => (
                    <Bullet key={bi} text={b} />
                  ))}
                </ul>

                {job.stack ? (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[11px] text-foreground-muted px-1.5 py-0.5 border border-border bg-background-elevated rounded-[2px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
