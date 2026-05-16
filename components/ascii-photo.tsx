"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const RAMP = " .:-=+*#%@";
const CELLS = 64;
const DECODE_MS = 700;

function sampleToAscii(img: HTMLImageElement): string[] {
  const canvas = document.createElement("canvas");
  canvas.width = CELLS;
  canvas.height = CELLS;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.drawImage(img, 0, 0, CELLS, CELLS);
  const { data } = ctx.getImageData(0, 0, CELLS, CELLS);
  const lines: string[] = [];
  for (let y = 0; y < CELLS; y++) {
    let line = "";
    for (let x = 0; x < CELLS; x++) {
      const i = (y * CELLS + x) * 4;
      const brightness =
        (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
      const idx = Math.min(
        RAMP.length - 1,
        Math.floor(brightness * RAMP.length),
      );
      line += RAMP[idx];
    }
    lines.push(line);
  }
  return lines;
}

function randomGrid(): string[] {
  const lines: string[] = [];
  for (let y = 0; y < CELLS; y++) {
    let line = "";
    for (let x = 0; x < CELLS; x++) {
      line += RAMP[Math.floor(Math.random() * RAMP.length)];
    }
    lines.push(line);
  }
  return lines;
}

function progressiveDecode(target: string[], progress: number): string[] {
  return target.map((line, y) => {
    let out = "";
    for (let x = 0; x < line.length; x++) {
      const cellProgress =
        progress * 1.4 - (y / CELLS) * 0.35 - (x / CELLS) * 0.05;
      out +=
        cellProgress >= 1
          ? line[x]
          : RAMP[Math.floor(Math.random() * RAMP.length)];
    }
    return out;
  });
}

function drawAscii(
  canvas: HTMLCanvasElement,
  lines: string[],
  color: string,
  fontFamily: string,
) {
  const dpr = window.devicePixelRatio || 1;
  const sizeCss = canvas.clientWidth;
  if (sizeCss === 0) return;
  canvas.width = sizeCss * dpr;
  canvas.height = sizeCss * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, sizeCss, sizeCss);

  const cell = sizeCss / CELLS;
  ctx.font = `${cell * 1.35}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    const cy = (y + 0.5) * cell;
    for (let x = 0; x < line.length; x++) {
      ctx.fillText(line[x], (x + 0.5) * cell, cy);
    }
  }
}

export function AsciiPhoto({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const decodedRef = useRef<string[] | null>(null);
  const currentLinesRef = useRef<string[]>([]);
  const rafRef = useRef<number | null>(null);
  const [photoVisible, setPhotoVisible] = useState(false);
  const [hoverPinned, setHoverPinned] = useState(false);

  const render = useCallback((lines: string[]) => {
    currentLinesRef.current = lines;
    if (!canvasRef.current || !wrapperRef.current) return;
    const style = getComputedStyle(wrapperRef.current);
    drawAscii(
      canvasRef.current,
      lines,
      style.color || "#f4f4f5",
      style.fontFamily || "ui-monospace, monospace",
    );
  }, []);

  useEffect(() => {
    render(randomGrid());

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      const decoded = sampleToAscii(img);
      decodedRef.current = decoded;

      if (reduced) {
        render(decoded);
        setPhotoVisible(true);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DECODE_MS, 1);
        render(progressiveDecode(decoded, progress));
        if (progress >= 1) {
          render(decoded);
          window.setTimeout(() => setPhotoVisible(true), 140);
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };
    img.src = src;

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [src, render]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ro = new ResizeObserver(() => render(currentLinesRef.current));
    ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [render]);

  const handlePointerEnter = () => {
    if (!decodedRef.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    render(decodedRef.current);
    setHoverPinned(true);
  };

  const handlePointerLeave = () => {
    setHoverPinned(false);
  };

  const showAscii = !photoVisible || hoverPinned;

  return (
    <div
      ref={wrapperRef}
      className="relative size-full text-foreground"
      style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full pointer-events-none transition-opacity duration-300"
        style={{ opacity: showAscii ? 1 : 0 }}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        className="absolute inset-0 size-full object-cover transition-opacity duration-300"
        style={{ opacity: showAscii ? 0 : 1 }}
      />
    </div>
  );
}
