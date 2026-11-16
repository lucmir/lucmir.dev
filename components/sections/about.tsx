import { about } from "@/lib/cv-data";

const SIDE_META: { k: string; v: string; accent?: boolean }[] = [
  { k: "now",     v: "Senior Full-Stack Engineer · Civic", accent: true },
  { k: "focus",   v: "AI agents · MCP · full-stack product" },
  { k: "stack",   v: "TypeScript · React/Next.js · Node.js" },
  { k: "based",   v: "Belo Horizonte, BR (UTC−3)" },
  { k: "speaks",  v: "English · Português" },
];

export function About() {
  return (
    <section
      id="about"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead name="about" index={1} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] border border-border bg-background-card">
        <div className="p-6 sm:p-7 md:border-r border-b md:border-b-0 border-border">
          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`font-sans text-[18.5px] leading-[1.6] mb-3.5 last:mb-0 ${
                i === 0 ? "text-foreground-strong" : "text-foreground"
              }`}
            >
              {p}
            </p>
          ))}
        </div>

        <aside className="p-5 grid gap-3.5 content-start text-[14.5px] bg-background-card-hi">
          {SIDE_META.map((row) => (
            <div key={row.k}>
              <div className="text-foreground-subtle uppercase tracking-[0.1em] text-[12.5px] mb-1">
                {row.k}
              </div>
              <div className={row.accent ? "text-foreground-strong font-semibold text-[15.5px]" : "text-foreground text-[15.5px]"}>
                {row.v}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function SectionHead({
  name,
  index,
  aside,
}: {
  name: string;
  index?: number;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-8 gap-4 flex-wrap border-b border-border pb-4">
      <div>
        {index ? (
          <div className="eyebrow text-accent mb-2">
            {String(index).padStart(2, "0")}
          </div>
        ) : null}
        <h2 className="display text-foreground-strong text-[clamp(2.5rem,5vw,3.75rem)] m-0 first-letter:uppercase">
          {name}
        </h2>
      </div>
      {aside ? (
        <span className="eyebrow text-foreground-muted pb-1.5">
          {aside}
        </span>
      ) : null}
    </div>
  );
}
