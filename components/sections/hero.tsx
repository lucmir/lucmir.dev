import { Download, Mail } from "lucide-react";
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
          <div className="font-mono text-[15.5px] text-foreground-muted mb-3.5 flex flex-wrap items-center gap-x-3.5 gap-y-1">
            <span>
              <span className="text-accent">@</span>lucmir
            </span>
            <span className="text-foreground-subtle">·</span>
            <span>Senior Full-Stack Engineer · AI Agents &amp; Cloud Infra</span>
            <span className="text-foreground-subtle">·</span>
            <span>Belo Horizonte, BR</span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.022em] leading-[1.02] text-foreground-strong mb-4">
            {profile.name}
          </h1>

          <p className="font-sans text-xl sm:text-2xl md:text-[26.5px] leading-[1.4] text-foreground-strong max-w-[60ch] mb-3">
            Builds AI <b className="text-accent font-medium">agents</b>, and the cloud infrastructure they run on.
          </p>

          <p className="text-[16.5px] text-foreground-muted max-w-[64ch] mb-7 leading-[1.6]">
            15+ years building and operating large-scale distributed systems. I work across product, cloud, AI/MCP, and identity, with a soft spot for observability, incident response, and architectures that hold up under real users. Currently building AI agents at Civic Technologies, where I also lead DevOps and infrastructure.
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-accent-soft border border-[color-mix(in_oklab,var(--accent)_50%,var(--border-strong))] text-accent hover:bg-[color-mix(in_oklab,var(--accent)_18%,transparent)] transition-colors"
            >
              <Download className="size-3.5" />
              Download CV
            </a>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <Mail className="size-3.5" />
              Get in touch
            </Link>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-3.5 py-2 font-sans text-[16px] font-medium rounded-[6px] bg-background-elevated border border-border-strong text-foreground-strong hover:border-accent hover:text-accent transition-colors"
            >
              <GithubIcon className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>

        {/* ID card */}
        <aside className="w-full md:w-[220px] border border-border bg-background-card">
          <div className="aspect-[1/1.05] overflow-hidden border-b border-border [filter:saturate(.85)_contrast(1.02)]">
            <Image
              src="/eu-profile.png"
              alt="Lucas Cunha"
              width={479}
              height={479}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 text-[14.5px] text-foreground-muted grid gap-1">
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 border border-border rounded-[6px] overflow-hidden bg-background-card">
        <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
          <div className="text-[13px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>experience</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
            15<span className="text-[16px] text-foreground-muted ml-1">+ yr</span>
          </div>
          <div className="text-[13px] text-foreground-muted mt-1.5">
            across cloud, AI, identity
          </div>
        </div>

        <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
          <div className="text-[13px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>companies</span><span>career</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
            {spans.length}
          </div>
          <CompanyTimeline spans={timeline} />
        </div>

        <div className="p-4 sm:p-5">
          <div className="text-[13px] text-foreground-muted uppercase tracking-[0.12em] mb-2 flex justify-between">
            <span>degrees</span><span>computer science</span>
          </div>
          <div className="font-mono font-medium text-2xl sm:text-3xl text-foreground-strong leading-none tracking-[-0.01em]">
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
