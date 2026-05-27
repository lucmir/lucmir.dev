import { SectionHead } from "@/components/sections/about";
import { skills } from "@/lib/cv-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead
        idx="03"
        name="skills"
        aside={
          <>
            <span className="text-accent">in green</span> = primary
          </>
        }
      />

      <div className="border border-border bg-background-card">
        {skills.map((group, gi) => {
          const isLast = gi === skills.length - 1;
          const primary = group.items.filter((i) => i.highlight).length;
          return (
            <div
              key={group.name}
              className={`grid grid-cols-1 md:grid-cols-[200px_1fr_60px] items-center gap-3 sm:gap-4 px-5 py-3.5 text-[13px] ${
                isLast ? "" : "border-b border-border"
              }`}
            >
              <div className="font-mono text-foreground-strong font-medium flex items-center gap-2.5">
                {group.name.toLowerCase()}
              </div>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-[12.5px]">
                {group.items.map((s) => (
                  <span
                    key={s.name}
                    className={s.highlight ? "text-accent" : "text-foreground-muted"}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
              <div className="font-mono text-[11.5px] text-foreground-muted text-left md:text-right">
                <em className="not-italic text-accent">{primary}</em>
                <span>/{group.items.length}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
