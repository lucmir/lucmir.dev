import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHead } from "@/components/sections/about";
import { certifications } from "@/lib/cv-data";

/* Static dates per cert. Order matches lib/cv-data → certifications. */
const ISO_DATES = [
  "2025-09",
  "2025-08",
  "2025-07",
  "2025-06",
  "2025-06",
  "2025-05",
];

export function Certifications() {
  return (
    <section
      id="certifications"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead name="certifications" />

      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
        {certifications.map((c, i) => (
          <li key={c.name}>
            <a
              href={c.verifyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group grid gap-2.5 p-3.5 border border-border bg-background-card hover:border-accent hover:-translate-y-0.5 transition-all h-full"
            >
              <div className="aspect-[4/3] bg-background-card-hi border border-border overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  width={400}
                  height={300}
                  className="block w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-[13px] text-foreground-muted uppercase tracking-[0.08em]">
                  {ISO_DATES[i] ?? ""}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.08em] text-foreground-muted group-hover:text-accent transition-colors">
                  verify <ExternalLink className="size-2.5" />
                </span>
              </div>
              <div className="font-sans text-[16.5px] leading-[1.35] text-foreground-strong font-medium">
                {c.name}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
