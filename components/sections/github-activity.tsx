import { SectionHeading } from "@/components/section-heading";
import {
  type ContributionLevel,
  fetchContributions,
  findLastActiveDate,
  relativeDayLabel,
} from "@/lib/github";

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: "bg-foreground/[0.04]",
  FIRST_QUARTILE: "bg-accent/25",
  SECOND_QUARTILE: "bg-accent/45",
  THIRD_QUARTILE: "bg-accent/70",
  FOURTH_QUARTILE: "bg-accent",
};

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const GAP_PX = 3;
const MIN_CELL_PX = 9; // floor on small screens so cells stay tappable

function computeMonthLabels(
  weeks: { contributionDays: { date: string }[] }[],
) {
  const labels: { weekIdx: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, idx) => {
    const firstDay = week.contributionDays[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getUTCMonth();
    if (month !== lastMonth) {
      // Skip if label would overlap the previous one (less than ~3 weeks apart)
      const prev = labels[labels.length - 1];
      if (!prev || idx - prev.weekIdx >= 3) {
        labels.push({ weekIdx: idx, label: MONTH_SHORT[month] });
      }
      lastMonth = month;
    }
  });
  return labels;
}

export async function GithubActivity() {
  const data = await fetchContributions();
  const lastActive = data ? findLastActiveDate(data) : null;

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
              <div
                className="grid font-mono text-[10px] text-foreground-subtle leading-none"
                style={{
                  gridTemplateColumns: `auto repeat(${data.weeks.length}, minmax(${MIN_CELL_PX}px, 1fr))`,
                  columnGap: `${GAP_PX}px`,
                  rowGap: `${GAP_PX}px`,
                }}
              >
                {/* Top-left corner spacer */}
                <div style={{ gridRow: 1, gridColumn: 1 }} />

                {/* Month labels (top row) */}
                {computeMonthLabels(data.weeks).map(({ weekIdx, label }) => (
                  <div
                    key={`${weekIdx}-${label}`}
                    className="whitespace-nowrap"
                    style={{ gridRow: 1, gridColumn: weekIdx + 2 }}
                  >
                    {label}
                  </div>
                ))}

                {/* Day labels (left column) — show Mon, Wed, Fri only */}
                {DAY_LABELS.map((day, i) => (
                  <div
                    key={day}
                    className="pr-2 self-center"
                    style={{
                      gridRow: i + 2,
                      gridColumn: 1,
                      visibility: i % 2 === 1 ? "visible" : "hidden",
                    }}
                  >
                    {day}
                  </div>
                ))}

                {/* Heatmap cells */}
                {data.weeks.flatMap((week, wi) =>
                  Array.from({ length: 7 }).map((_, di) => {
                    const day = week.contributionDays.find(
                      (d) => new Date(d.date).getUTCDay() === di,
                    );
                    return (
                      <div
                        key={`${wi}-${di}`}
                        className={`aspect-square rounded-[2px] ${day ? LEVEL_CLASS[day.contributionLevel] : ""}`}
                        title={
                          day
                            ? `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`
                            : undefined
                        }
                        style={{ gridColumn: wi + 2, gridRow: di + 2 }}
                      />
                    );
                  }),
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-3 font-mono text-[10px] text-foreground-subtle">
                <span>Less</span>
                {(
                  [
                    "NONE",
                    "FIRST_QUARTILE",
                    "SECOND_QUARTILE",
                    "THIRD_QUARTILE",
                    "FOURTH_QUARTILE",
                  ] as ContributionLevel[]
                ).map((lvl) => (
                  <div
                    key={lvl}
                    className={`size-2.5 rounded-[2px] ${LEVEL_CLASS[lvl]}`}
                    aria-hidden
                  />
                ))}
                <span>More</span>
              </div>
            </div>

            <p className="font-mono text-xs text-foreground-subtle">
              <span className="text-accent">//</span> includes private repo
              contributions · updates ~hourly
              {lastActive ? ` · last active ${relativeDayLabel(lastActive)}` : ""}
            </p>
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
