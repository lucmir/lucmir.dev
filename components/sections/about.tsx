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
      <SectionHead name="about" />

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

        <aside className="p-5 grid gap-3.5 content-start text-[14.5px] bg-sage text-ink-inv">
          {SIDE_META.map((row) => (
            <div key={row.k}>
              <div className="text-ink-inv-muted uppercase tracking-[0.1em] text-[13px] mb-1">
                {row.k}
              </div>
              <div className={row.accent ? "text-ink-inv font-semibold text-[15.5px] underline decoration-brand decoration-2 underline-offset-4" : "text-ink-inv text-[15.5px]"}>
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
  aside,
}: {
  name: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-7 gap-4 flex-wrap border-b-2 border-brand pb-3">
      <h2 className="display text-brand text-[clamp(2.4rem,6vw,4.25rem)] m-0">
        {name}
      </h2>
      {aside ? (
        <span className="text-[15.5px] text-foreground-muted">
          {aside}
        </span>
      ) : null}
    </div>
  );
}
