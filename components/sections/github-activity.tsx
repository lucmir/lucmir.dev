import { HeatmapGrid } from "@/components/heatmap-grid";
import { SectionHeading } from "@/components/section-heading";
import { fetchContributions } from "@/lib/github";

export async function GithubActivity() {
  const data = await fetchContributions();

  return (
    <section
      id="activity"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-8">
        <SectionHeading label="// activity" title="Live from GitHub" />

        {data ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-foreground-muted text-base sm:text-lg">
                <span className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                  {data.totalContributions.toLocaleString()}
                </span>{" "}
                contributions in the last year
              </p>
              <p className="font-mono text-xs text-foreground-subtle">
                <span className="text-accent">//</span> counting commits is a
                silly metric — take it with a grain of salt
              </p>
            </div>

            <div className="rounded-md border border-border bg-background-elevated p-4 sm:p-5 overflow-x-auto">
              <HeatmapGrid calendar={data} />
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-border bg-background-elevated p-8">
            <p className="font-mono text-sm text-foreground-subtle">
              <span className="text-accent">//</span> GitHub stats unavailable.
              Set <code className="text-foreground">GITHUB_TOKEN</code> in your
              environment to enable.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
