import { SectionHeading } from "@/components/section-heading";

export function GithubActivity() {
  return (
    <section
      id="activity"
      className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 scroll-mt-20"
    >
      <div className="space-y-8">
        <SectionHeading label="// activity" title="Live from GitHub" />
        <div className="rounded-lg border border-border bg-background-elevated p-8 sm:p-12">
          <p className="font-mono text-sm text-foreground-subtle">
            <span className="text-accent">//</span> M4 will wire this up:
            contribution heatmap, recent commits, and top languages
            (incl. private repos).
          </p>
        </div>
      </div>
    </section>
  );
}
