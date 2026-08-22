import { SectionHead } from "@/components/sections/about";
import { education } from "@/lib/cv-data";

export function Education() {
  return (
    <section
      id="education"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead name="education" aside="UFMG · 2 degrees" />

      <div className="border border-border bg-background-card">
        {education.map((e, i) => {
          const isLast = i === education.length - 1;
          return (
            <div
              key={`${e.school}-${e.degree}-${i}`}
              className={`grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-3 md:gap-6 px-5 py-4 items-baseline ${
                isLast ? "" : "border-b border-border"
              }`}
            >
              <div className="font-mono text-[15px] text-accent">
                {e.duration.replace(/[—–-]/g, "→")}
              </div>
              <div>
                <div className="font-sans text-lg text-foreground-strong font-semibold">
                  {e.school}
                </div>
                <div className="text-[15px] text-foreground-muted mt-0.5">
                  {abbreviateDegree(e.degree)} · {e.field}
                </div>
              </div>
              <div className="font-mono text-[14.5px] text-foreground-muted">UFMG · BR</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function abbreviateDegree(d: string) {
  if (/master/i.test(d)) return "M.Sc";
  if (/bachelor/i.test(d)) return "B.Sc";
  if (/phd|doctor/i.test(d)) return "Ph.D";
  return d;
}
