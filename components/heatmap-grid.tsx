"use client";

import { useRef, useState } from "react";
import type {
  ContributionCalendar,
  ContributionDay,
  ContributionLevel,
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
const MIN_CELL_PX = 9;

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
      const prev = labels[labels.length - 1];
      if (!prev || idx - prev.weekIdx >= 3) {
        labels.push({ weekIdx: idx, label: MONTH_SHORT[month] });
      }
      lastMonth = month;
    }
  });
  return labels;
}

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

type HoverState = {
  day: ContributionDay;
  left: number;
  top: number;
};

export function HeatmapGrid({ calendar }: { calendar: ContributionCalendar }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const handleEnter = (
    e: React.PointerEvent<HTMLDivElement>,
    day: ContributionDay,
  ) => {
    const container = containerRef.current;
    if (!container) return;
    const cellRect = e.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHover({
      day,
      left: cellRect.left - containerRect.left + cellRect.width / 2,
      top: cellRect.bottom - containerRect.top + 6,
    });
  };

  const handleLeave = () => setHover(null);

  return (
    <div ref={containerRef} className="relative">
      {/* Screen-reader summary; the visual grid below is described per-cell */}
      <p className="sr-only">
        GitHub contribution heatmap: {calendar.totalContributions.toLocaleString()}{" "}
        contributions in the last 12 months.
      </p>
      <div
        className="grid font-mono text-[13px] text-foreground-subtle leading-none"
        style={{
          gridTemplateColumns: `auto repeat(${calendar.weeks.length}, minmax(${MIN_CELL_PX}px, 1fr))`,
          columnGap: `${GAP_PX}px`,
          rowGap: `${GAP_PX}px`,
        }}
      >
        {/* Top-left corner spacer */}
        <div style={{ gridRow: 1, gridColumn: 1 }} />

        {/* Month labels */}
        {computeMonthLabels(calendar.weeks).map(({ weekIdx, label }) => (
          <div
            key={`${weekIdx}-${label}`}
            className="whitespace-nowrap"
            style={{ gridRow: 1, gridColumn: weekIdx + 2 }}
          >
            {label}
          </div>
        ))}

        {/* Day labels */}
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

        {/* Cells */}
        {calendar.weeks.flatMap((week, wi) =>
          Array.from({ length: 7 }).map((_, di) => {
            const day = week.contributionDays.find(
              (d) => new Date(d.date).getUTCDay() === di,
            );
            const isHovered = hover && day && hover.day.date === day.date;
            return (
              <div
                key={`${wi}-${di}`}
                role={day ? "img" : undefined}
                aria-hidden={day ? undefined : true}
                aria-label={
                  day
                    ? `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatDate(day.date)}`
                    : undefined
                }
                className={`aspect-square transition-shadow ${day ? LEVEL_CLASS[day.contributionLevel] : ""} ${isHovered ? "ring-1 ring-foreground/50" : ""}`}
                style={{ gridColumn: wi + 2, gridRow: di + 2 }}
                onPointerEnter={day ? (e) => handleEnter(e, day) : undefined}
                onPointerLeave={day ? handleLeave : undefined}
              />
            );
          }),
        )}
      </div>

      {/* Footer row: caption (left) + legend (right) */}
      <div className="flex items-center justify-between gap-3 mt-4 font-mono text-[13px] text-foreground-subtle flex-wrap">
        <span>private repos included · updates ~hourly</span>
        <div className="flex items-center gap-1.5">
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
              className={`size-2.5 ${LEVEL_CLASS[lvl]}`}
              aria-hidden
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Tooltip */}
      {hover ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 px-2.5 py-1.5 rounded-md bg-foreground text-background font-mono text-[14px] whitespace-nowrap shadow-lg"
          style={{
            left: hover.left,
            top: hover.top,
            transform: "translateX(-50%)",
          }}
        >
          <span className="font-semibold">{hover.day.contributionCount}</span>{" "}
          contribution{hover.day.contributionCount === 1 ? "" : "s"} ·{" "}
          {formatDate(hover.day.date)}
        </div>
      ) : null}
    </div>
  );
}
