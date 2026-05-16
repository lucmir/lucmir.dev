import { ImageResponse } from "next/og";
import { profile } from "@/lib/cv-data";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 70% 90% at 80% 30%, rgba(245, 166, 35, 0.18) 0%, rgba(10, 10, 11, 0) 60%), #0a0a0b",
          color: "#f4f4f5",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 24 }}>
          <span style={{ color: "#f5a623" }}>$</span>
          <span style={{ marginLeft: 12, fontFamily: "ui-monospace, monospace" }}>
            whoami
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#f4f4f5",
              maxWidth: 900,
              lineHeight: 1.2,
            }}
          >
            {profile.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#a1a1aa",
              maxWidth: 900,
              marginTop: 8,
            }}
          >
            {profile.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontFamily: "ui-monospace, monospace",
            fontSize: 22,
          }}
        >
          <span>lucmir.dev</span>
          <span style={{ color: "#f5a623" }}>● ● ●</span>
        </div>
      </div>
    ),
    size,
  );
}
