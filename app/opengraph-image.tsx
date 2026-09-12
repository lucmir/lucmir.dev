import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/cv-data";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Mirrors the light theme tokens in app/globals.css. ImageResponse can't
   read CSS variables, so the values are inlined here — keep them in sync
   if the palette changes. */
const C = {
  background: "#fbfbfa",
  card: "#ffffff",
  cardHi: "#f4f4f2",
  foreground: "#2b322e",
  strong: "#141816",
  muted: "#525955",
  subtle: "#6e7571",
  border: "#dbdcd7",
  accent: "#a4530d",
  accentSoft: "rgba(164, 83, 13, 0.09)",
};

/* [word, accent?] — the accent words mirror the hero's highlighted "end to end". */
const TAGLINE_WORDS: [string, boolean?][] = [
  ["Ships"], ["products"], ["end", true], ["to", true], ["end:", true],
  ["UI,"], ["APIs,"], ["data,"], ["AI"], ["agents,"], ["and"], ["the"],
  ["cloud"], ["platform"], ["they"], ["run"], ["on."],
];

const HANDLE_LINE = "Senior Full-Stack Engineer · TypeScript, React, Node · AWS · AI Agents";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public", "profile-cutout.png"));
  const photoDataUrl = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.background,
          color: C.foreground,
          padding: "64px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        {/* Handle line — same as the hero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: C.muted,
            fontSize: 22,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span style={{ display: "flex" }}>
            <span style={{ color: C.accent }}>@</span>
            <span>lucmir</span>
          </span>
          <span style={{ color: C.subtle }}>·</span>
          <span>{HANDLE_LINE}</span>
        </div>

        {/* Middle: copy + ID card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
            flex: 1,
            marginTop: 28,
            marginBottom: 28,
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                fontSize: 82,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1,
                color: C.strong,
              }}
            >
              {profile.name}
            </div>
            {/* Satori can't mix raw text and <span>s in one block, so the
               tagline is laid out word by word in a wrapping flex row. */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 9,
                fontSize: 32,
                lineHeight: 1.3,
                color: C.strong,
                maxWidth: 720,
              }}
            >
              {TAGLINE_WORDS.map(([word, accent], i) => (
                <span
                  key={`${word}-${i}`}
                  style={accent ? { color: C.accent, fontWeight: 500 } : undefined}
                >
                  {word}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 21,
                lineHeight: 1.45,
                color: C.muted,
                maxWidth: 680,
              }}
            >
              15+ years shipping full-stack products in TypeScript, React/Next.js, and Node.js, from identity and payments to LLM agents.
            </div>
          </div>

          {/* ID card, like the hero aside */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 250,
              border: `1px solid ${C.border}`,
              background: C.card,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 248,
                height: 260,
                background: C.cardHi,
                borderBottom: `1px solid ${C.border}`,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoDataUrl}
                alt=""
                width={248}
                height={260}
                style={{ objectFit: "cover", width: 248, height: 260 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "14px 16px",
                fontSize: 17,
                color: C.muted,
              }}
            >
              {[
                ["role", "Sr Eng"],
                ["team", "Civic"],
                ["exp", "15+ yr"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 14 }}>
                  <span style={{ width: 56 }}>{k}</span>
                  <span style={{ color: C.strong, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: `1px solid ${C.border}`,
            color: C.subtle,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 20,
          }}
        >
          <span>lucas-cunha.com</span>
          <span>Belo Horizonte · UTC−3</span>
        </div>
      </div>
    ),
    size,
  );
}
