import { Download, Laptop, Mail } from "lucide-react";
import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import {
  CompanyTimeline,
  type TimelineSpan,
} from "@/components/company-timeline";
import { experience, profile } from "@/lib/cv-data";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseMonthYear(s: string, now: Date): Date | null {
  if (/present|now/i.test(s)) return now;
  const m = s.match(/(\w+)\s+(\d{4})/);
  if (!m) return null;
  return new Date(Number(m[2]), Math.max(0, MONTHS.indexOf(m[1])), 1);
}

/** Aggregate experience entries by company. Multiple roles at the same
 * company collapse into a single span (earliest start → latest end). */
function getCompanySpans(now: Date) {
  const byCompany = new Map<string, { start: Date; end: Date }>();
  for (const job of experience) {
    const [startRaw, endRaw] = job.duration.split(/\s*[—–-]\s*/);
    const start = parseMonthYear(startRaw, now);
    const end = endRaw ? parseMonthYear(endRaw, now) : now;
    if (!start || !end) continue;
    const existing = byCompany.get(job.company);
    if (existing) {
      if (start < existing.start) existing.start = start;
      if (end > existing.end) existing.end = end;
    } else {
      byCompany.set(job.company, { start, end });
    }
  }
  return Array.from(byCompany.entries())
    .map(([company, { start, end }]) => ({
      company,
      start,
      end,
      months:
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()),
    }))
    .filter((s) => s.months > 0)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

// Display-name overrides for the tiny tooltip — full names live in
// cv-data.ts for formal use elsewhere.
const SHORT_NAMES: Record<string, string> = {
  "Universidade Federal de Minas Gerais": "UFMG",
};

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

const STACK = ["UI", "APIs", "data", "AI agents", "the cloud platform they run on"];

export async function Hero() {
  "use cache";
  // "now" feeds the company timeline / "Present" durations. Cached with a
  // daily revalidate so they track real time instead of freezing at build.
  cacheLife("days");

  const now = new Date();
  const spans = getCompanySpans(now);
  const totalMonths = spans.reduce((s, x) => s + x.months, 0) || 1;
  const timeline: TimelineSpan[] = spans.map((s) => ({
    company: SHORT_NAMES[s.company] ?? s.company,
    years: s.months / 12,
    yearStart: s.start.getFullYear(),
    yearEnd: s.end >= now ? "now" : s.end.getFullYear(),
    widthPercent: (s.months / totalMonths) * 100,
  }));

  return (
    /* Hero fills the viewport below the sticky nav (h-14 + 1px border =
       57px) so the next section's heading always starts below the fold.
       min-h, not h, so short viewports fall back to normal flow instead of
       cramping. vh (not svh/dvh) for the widest browser support. */
    <section
      id="top"
      className="border-b border-border max-w-[1200px] mx-auto px-5 sm:px-8 pt-8 pb-8 min-h-[calc(100vh_-_57px)] flex flex-col justify-evenly"
    >
      {/* Top row: name+copy on left, ID card on right */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          {/* Handle line */}
          <div className="eyebrow text-foreground-muted mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              <span className="text-accent">@</span>lucmir
            </span>
            <span aria-hidden className="hidden sm:inline text-foreground-subtle">·</span>
            <span>Senior Full-Stack Engineer · TypeScript, React, Node · AWS · AI Agents</span>
            <span aria-hidden className="hidden sm:inline text-foreground-subtle">·</span>
            <span>Belo Horizonte, BR</span>
          </div>

          <h1 className="display text-foreground-strong text-[clamp(3.5rem,9vw,7.25rem)] leading-[0.95] mb-7 -ml-[0.03em] [text-wrap:balance]">
            {firstName} <span className="text-accent">{lastName}</span>
          </h1>

          <div className="mb-7">
            {/* Tagline as a pull-quote: brand rule on the left, headline on
                top, the stack it covers underneath with accent separators. */}
            <div className="border-l border-accent pl-5 mb-5 flex items-center gap-4">
              <Laptop
                aria-hidden
                strokeWidth={1.5}
                className="size-11 sm:size-14 shrink-0 text-accent"
              />
              <div>
              <p className="font-sans text-xl sm:text-2xl md:text-[26.5px] font-semibold leading-[1.3] text-foreground-strong">
                Ships products <span className="text-accent">end to end</span>
              </p>
              <p className="mt-1 font-sans text-lg sm:text-xl leading-[1.4] text-foreground">
                {STACK.map((item, i) => (
                  <span key={item}>
                    {i > 0 && (
                      <span aria-hidden className="mx-2 text-accent">
                        /
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
              </div>
            </div>

            <p className="text-[16.5px] text-foreground-muted leading-[1.6]">
              15+ years shipping full-stack products in TypeScript, React/Next.js, and Node.js, from identity and payments to LLM agents.{" "}
              <b className="font-semibold text-foreground-strong">Claude Certified Architect.</b>{" "}
              I own production on AWS, so what I build actually runs.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-brand border border-brand text-brand-ink hover:bg-accent hover:border-accent hover:text-background transition-colors"
            >
              <Download className="size-3.5" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-transparent border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <Mail className="size-3.5" />
              Get in touch
            </Link>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-sans text-[15.5px] font-medium rounded-full bg-transparent border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <GithubIcon className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>

        {/* ID card */}
        <aside className="w-full md:w-[220px] border border-border rounded-[4px] overflow-hidden bg-background-card p-2 shadow-[0_1px_0_rgba(22,21,19,0.03),0_18px_40px_-24px_rgba(22,21,19,0.35)]">
          {/* Cut-out portrait on a tinted panel: the backdrop is what keeps the
              dark hair and shirt separated from the card in dark mode. The old
              saturate/contrast filter is gone — it existed to tame the warm
              lighting of the previous photo. */}
          <div className="aspect-[1/1.05] overflow-hidden rounded-[2px] bg-background-card-hi">
            <Image
              src="/profile-cutout.png"
              alt="Lucas Cunha"
              width={600}
              height={600}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-1.5 pt-3 pb-1 text-[14px] text-foreground-muted grid gap-1">
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>role</span>
              <b className="font-medium text-foreground-strong">Sr Eng</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>team</span>
              <b className="font-medium text-foreground-strong">Civic</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>tz</span>
              <b className="font-medium text-foreground-strong">UTC−3</b>
            </div>
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <span>exp</span>
              <b className="font-medium text-foreground-strong">15+ yr</b>
            </div>
          </div>
        </aside>
      </div>

      {/* Tiles */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 sm:p-5 rounded-[4px] bg-background-card border border-border">
          <div className="eyebrow text-foreground-muted mb-3 flex justify-between">
            <span>experience</span>
          </div>
          <div className="display text-[2.75rem] sm:text-[3.25rem] text-foreground-strong leading-none">
            15<span className="text-accent">+</span><span className="font-sans font-normal text-[15px] tracking-normal text-foreground-muted ml-1.5">years</span>
          </div>
          <div className="text-[13px] text-foreground-muted mt-1.5">
            across product, AI, identity
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[4px] bg-background-card border border-border">
          <div className="eyebrow text-foreground-muted mb-3 flex justify-between">
            <span>companies</span><span>career</span>
          </div>
          <div className="display text-[2.75rem] sm:text-[3.25rem] text-foreground-strong leading-none">
            {spans.length}
          </div>
          <CompanyTimeline spans={timeline} />
        </div>

        <div className="p-4 sm:p-5 rounded-[4px] bg-background-card border border-border">
          <div className="eyebrow text-foreground-muted mb-3 flex justify-between">
            <span>degrees</span><span>computer science</span>
          </div>
          <div className="display text-[2.75rem] sm:text-[3.25rem] text-foreground-strong leading-none">
            2
          </div>
          <div className="text-[13px] text-foreground-muted mt-1.5">
            BSc + MSc, UFMG
          </div>
        </div>
      </div>
    </section>
  );
}
