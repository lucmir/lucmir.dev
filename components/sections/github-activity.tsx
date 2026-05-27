import { HeatmapGrid } from "@/components/heatmap-grid";
import { SectionHead } from "@/components/sections/about";
import { fetchContributions } from "@/lib/github";

export async function GithubActivity() {
  const data = await fetchContributions();

  return (
    <section
      id="activity"
      className="max-w-[1200px] mx-auto px-5 sm:px-8 py-14 border-b border-border scroll-mt-20"
    >
      <SectionHead idx="01" name="activity" aside="github · last 12 months" />

      {data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] border border-border bg-background-card">
            <div className="p-5 sm:p-6 border-b md:border-b-0 md:border-r border-border overflow-x-auto">
              <div className="flex justify-between items-center mb-3.5 text-[11px] text-foreground-muted uppercase tracking-[0.1em]">
                <span>contribution heatmap · 52w</span>
                <span>UTC−3</span>
              </div>
              <HeatmapGrid calendar={data} />
            </div>

            <div className="p-5 grid gap-4 content-start">
              <div className="grid grid-cols-[1fr_auto] items-baseline border-b border-dashed border-border pb-2">
                <span className="text-[11px] text-foreground-muted uppercase tracking-[0.08em]">contributions · 12mo</span>
                <span className="font-mono text-lg">
                  <em className="not-italic text-accent">{data.totalContributions.toLocaleString()}</em>
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-baseline border-b border-dashed border-border pb-2">
                <span className="text-[11px] text-foreground-muted uppercase tracking-[0.08em]">weeks shown</span>
                <span className="font-mono text-lg text-foreground-strong">{data.weeks.length}</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-baseline border-b border-dashed border-border pb-2">
                <span className="text-[11px] text-foreground-muted uppercase tracking-[0.08em]">repos included</span>
                <span className="font-mono text-[13px] text-foreground-strong">public + private</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-baseline">
                <span className="text-[11px] text-foreground-muted uppercase tracking-[0.08em]">refresh</span>
                <span className="font-mono text-[13px] text-foreground-strong">~hourly</span>
              </div>
            </div>
          </div>

          <p className="mt-3.5 py-2.5 px-3.5 font-sans text-[12.5px] leading-[1.5] text-foreground-muted italic border-l-2 border-border-strong max-w-[80ch]">
            <b className="text-foreground-strong not-italic font-medium">Caveat:</b>{" "}
            commit count is a silly metric, treat this as a fingerprint, not a measure.
          </p>
        </>
      ) : (
        <div className="border border-border bg-background-card p-6">
          <p className="font-mono text-[12.5px] text-foreground-muted">
            <span className="text-accent">//</span> GitHub stats unavailable. Set <code className="text-foreground-strong">GITHUB_TOKEN</code> in your environment to enable.
          </p>
        </div>
      )}
    </section>
  );
}
