import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { certifications, skills } from "@/lib/cv-data";

export function Skills() {
  return (
    <section
      id="skills"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-16 scroll-mt-20"
    >
      <div className="rounded-2xl border border-border/70 bg-foreground/[0.015] p-6 sm:p-10 lg:p-12 space-y-12">
        <SectionHeading
          label="// skills"
          title="What I work with"
          anchorId="skills"
        />

        <p className="text-sm text-foreground-muted">
          Items in{" "}
          <span className="px-2 py-0.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-medium">
            yellow
          </span>{" "}
          are where I'm most experienced; the rest is solid working knowledge.
        </p>

        <div className="columns-1 sm:columns-2 gap-x-10">
          {skills.map((group) => (
            <div
              key={group.name}
              className="space-y-3 mb-8 break-inside-avoid"
            >
              <h3 className="font-mono text-sm text-foreground-subtle uppercase tracking-wider">
                {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={
                      item.highlight
                        ? "px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-sm font-medium"
                        : "px-2.5 py-1 rounded border border-border text-foreground-muted text-sm"
                    }
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-mono text-xs text-foreground-subtle">
          <span className="text-accent">//</span> p.s. probably forgot a few :)
        </p>

        <div className="space-y-5 pt-6">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Anthropic Certifications
          </h3>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((c) => (
              <li key={c.name}>
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-4 p-4 rounded-md bg-background-elevated border border-border hover:border-accent transition-colors h-full"
                >
                  <div
                    className="shrink-0 w-32 sm:w-36 p-2 relative"
                    style={{
                      background:
                        "linear-gradient(135deg, #5a3a1e 0%, #3d2614 50%, #5a3a1e 100%)",
                      borderRadius: "2px",
                      boxShadow: [
                        "inset 0 0 0 1px rgba(255, 210, 150, 0.10)",
                        "inset 0 1px 1px rgba(255, 220, 170, 0.12)",
                        "inset 0 -1px 2px rgba(0, 0, 0, 0.45)",
                        "0 2px 4px rgba(0, 0, 0, 0.5)",
                        "0 6px 14px rgba(0, 0, 0, 0.4)",
                      ].join(", "),
                    }}
                  >
                    <Image
                      src={c.image}
                      alt={`${c.name} certificate`}
                      width={160}
                      height={124}
                      className="block w-full h-auto"
                    />
                    {c.featured ? (
                      <span
                        aria-label="Featured certification"
                        title="Top-tier certification"
                        className="absolute -top-2 -right-2 rounded-full bg-background p-1 ring-1 ring-accent/40 shadow-md"
                      >
                        <Star className="size-4 text-accent fill-accent" />
                      </span>
                    ) : null}
                  </div>
                  <span className="flex-1 text-sm text-foreground-muted group-hover:text-foreground transition-colors">
                    {c.name}
                  </span>
                  <ExternalLink className="size-3.5 text-foreground-subtle group-hover:text-accent transition-colors shrink-0 self-start mt-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
