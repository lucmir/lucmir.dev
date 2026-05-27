"use client";

import { useRef, useState } from "react";

export type TimelineSpan = {
  company: string;
  years: number;
  yearStart: number;
  yearEnd: number | "now";
  widthPercent: number;
};

type HoverState = { span: TimelineSpan; left: number; top: number };

export function CompanyTimeline({ spans }: { spans: TimelineSpan[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const onEnter = (
    e: React.PointerEvent<SVGRectElement>,
    span: TimelineSpan,
  ) => {
    const container = containerRef.current;
    if (!container) return;
    const rectBox = e.currentTarget.getBoundingClientRect();
    const containerBox = container.getBoundingClientRect();
    setHover({
      span,
      left: rectBox.left - containerBox.left + rectBox.width / 2,
      top: rectBox.top - containerBox.top - 6,
    });
  };

  const onLeave = () => setHover(null);

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        className="w-full h-6 mt-2.5 block"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        aria-label="Career timeline by company"
      >
        {(() => {
          let xCursor = 0;
          return spans.map((s, i) => {
            const x = xCursor;
            const w = s.widthPercent;
            xCursor += w;
            const opacity =
              spans.length === 1
                ? 1
                : 0.35 + (i / (spans.length - 1)) * 0.65;
            return (
              <rect
                key={s.company}
                x={x + 0.3}
                y={2}
                width={Math.max(0, w - 0.6)}
                height={20}
                fill="var(--accent)"
                fillOpacity={opacity}
                rx={0.8}
                onPointerEnter={(e) => onEnter(e, s)}
                onPointerLeave={onLeave}
                style={{ cursor: "default" }}
              />
            );
          });
        })()}
      </svg>

      {hover ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full px-2.5 py-1.5 rounded-[2px] bg-foreground-strong text-background font-mono text-[10.5px] whitespace-nowrap shadow-lg"
          style={{ left: hover.left, top: hover.top }}
        >
          <span className="font-semibold">{hover.span.company}</span>
          <span className="text-foreground-subtle mx-1.5">·</span>
          <span>{hover.span.years.toFixed(1)} yr</span>
          <span className="text-foreground-subtle mx-1.5">·</span>
          <span>
            {hover.span.yearStart} → {hover.span.yearEnd}
          </span>
        </div>
      ) : null}
    </div>
  );
}
