import { HeatmapGrid } from "@/components/heatmap-grid";
import { SectionHead } from "@/components/sections/about";
import { fetchContributions } from "@/lib/github";

export async function GithubActivity() {
  const data = await fetchContributions();

  // No data (missing GITHUB_TOKEN or API failure): hide the section rather
  // than show visitors an internal setup message. The nav link to #activity
  // becomes a no-op in that state, which is acceptable for a fallback.
  if (!data) return null;

  return (
    <section
      id="activity"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead name="activity" aside="GitHub · last 12 months" />

      <div className="border border-border rounded-[8px] bg-background-card">
        <div className="p-5 sm:p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-3.5 text-[14px] text-foreground-muted uppercase tracking-[0.1em]">
            <span>contribution heatmap · 52w</span>
            <span>UTC−3</span>
          </div>
          <HeatmapGrid calendar={data} />

          <div className="mt-5 pt-4 border-t border-dashed border-border flex items-baseline gap-3 flex-wrap">
            <span className="text-[14px] text-foreground-muted uppercase tracking-[0.08em]">
              contributions · 12mo
            </span>
            <span className="font-mono text-2xl font-medium text-accent">
              {data.totalContributions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 py-3 px-4 font-sans text-[15.5px] leading-[1.55] text-foreground bg-accent-soft border-l-2 border-accent rounded-r-[6px] max-w-[80ch]">
        <b className="text-accent font-semibold">Caveat:</b>{" "}
        Commit count is a silly metric. Green squares aren&apos;t shipped
        software.
      </p>
    </section>
  );
}
