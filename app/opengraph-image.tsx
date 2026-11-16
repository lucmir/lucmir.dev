import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/cv-data";

export const runtime = "nodejs";
export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Mirrors the light theme tokens in app/globals.css ("Swiss signal").
   ImageResponse can't read CSS variables, so the values are inlined here;
   keep them in sync if the palette changes. */
const C = {
  background: "#f4f4f2",
  card: "#ffffff",
  cardHi: "#ebebe8",
  ink: "#0d0d0d",
  foreground: "#222222",
  muted: "#5c5c5a",
  subtle: "#777775",
  border: "#e0e0dc",
  accent: "#ff7a3d",
};

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

export default async function OpengraphImage() {
  // Satori can't use next/font, so the OG image reads vendored static TTFs
  // (Schibsted Grotesk, OFL). Only one family is registered, so all text
  // renders in it.
  const fonts = join(process.cwd(), "app", "fonts");
  const [photo, regular, medium, bold] = await Promise.all([
    readFile(join(process.cwd(), "public", "profile-cutout.png")),
    readFile(join(fonts, "SchibstedGrotesk-Regular.ttf")),
    readFile(join(fonts, "SchibstedGrotesk-Medium.ttf")),
    readFile(join(fonts, "SchibstedGrotesk-Bold.ttf")),
  ]);
  const photoDataUrl = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: C.background,
          color: C.foreground,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Schibsted Grotesk",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 64,
            flex: 1,
            padding: "0 72px",
          }}
        >
          {/* Left: eyebrow, name, tagline — same structure as the hero */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                gap: 14,
                fontSize: 20,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: 22,
              }}
            >
              <span style={{ color: C.accent }}>@lucmir</span>
              <span style={{ color: C.subtle }}>·</span>
              <span>Senior Full-Stack Engineer</span>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 122,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-5px",
                color: C.ink,
                marginLeft: -4,
                marginBottom: 34,
              }}
            >
              {/* flexShrink 0 + explicit margin: when the name is wider than the
                  column, Satori shrinks the spans and swallows any gap. */}
              <span style={{ flexShrink: 0, marginRight: 30 }}>{firstName}</span>
              <span style={{ flexShrink: 0, color: C.accent }}>{lastName}</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderLeft: `3px solid ${C.accent}`,
                paddingLeft: 22,
                gap: 6,
              }}
            >
              <div style={{ display: "flex", gap: 10, fontSize: 36, fontWeight: 500, color: C.ink }}>
                <span>Ships products</span>
                <span style={{ color: C.accent }}>end to end</span>
              </div>
              <div style={{ display: "flex", fontSize: 26, color: C.muted, whiteSpace: "nowrap" }}>
                TypeScript · React · Node · AWS · AI agents
              </div>
            </div>
          </div>

          {/* Right: matted ID card, like the hero aside */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 264,
              padding: 10,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              boxShadow: "0 24px 48px -28px rgba(13,13,13,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 242,
                height: 254,
                background: C.cardHi,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoDataUrl}
                alt=""
                width={242}
                height={254}
                style={{ objectFit: "cover", width: 242, height: 254 }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: "14px 6px 4px",
                fontSize: 18,
                color: C.muted,
              }}
            >
              {[
                ["role", "Sr Eng"],
                ["team", "Civic"],
                ["exp", "15+ yr"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 14 }}>
                  <span style={{ width: 60 }}>{k}</span>
                  <span style={{ color: C.ink, fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: hairline rule, like the site footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 72px",
            padding: "22px 0 30px",
            borderTop: `1px solid ${C.border}`,
            color: C.muted,
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ display: "flex", width: 10, height: 10, borderRadius: 5, background: C.accent }} />
            <span style={{ color: C.ink, fontWeight: 500 }}>lucas-cunha.com</span>
          </span>
          <span>Belo Horizonte · UTC−3</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Schibsted Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Schibsted Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
