import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/cv-data";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "eu-serious.png"));
  const photoDataUrl = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse 70% 90% at 80% 30%, rgba(250, 189, 47, 0.18) 0%, rgba(40, 40, 40, 0) 60%), #282828",
          color: "#f4f4f5",
          padding: "70px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Header row */}
        <div style={{ display: "flex", color: "#a1a1aa", fontSize: 22 }}>
          <span style={{ color: "#fabd2f" }}>$</span>
          <span style={{ marginLeft: 10, fontFamily: "ui-monospace, monospace" }}>
            whoami
          </span>
        </div>

        {/* Middle row: text + photo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
            flex: 1,
            marginTop: 32,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 84,
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
                fontSize: 30,
                color: "#f4f4f5",
                maxWidth: 600,
                lineHeight: 1.25,
              }}
            >
              {profile.tagline}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: "#a1a1aa",
                maxWidth: 600,
                lineHeight: 1.4,
                marginTop: 4,
              }}
            >
              {profile.subtitle}
            </div>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoDataUrl}
            alt=""
            width={320}
            height={320}
            style={{
              borderRadius: 160,
              objectFit: "cover",
              border: "1px solid rgba(250, 189, 47, 0.25)",
              boxShadow:
                "0 0 60px -8px rgba(250, 189, 47, 0.35), 0 20px 40px -16px rgba(0, 0, 0, 0.6)",
            }}
          />
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontFamily: "ui-monospace, monospace",
            fontSize: 20,
          }}
        >
          <span>lucas-cunha.com</span>
          <span style={{ color: "#fabd2f" }}>● ● ●</span>
        </div>
      </div>
    ),
    size,
  );
}
