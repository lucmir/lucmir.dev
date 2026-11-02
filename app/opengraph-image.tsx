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
  background: "#ecebf0",
  card: "#f3f2f6",
  ink: "#1f2015",
  foreground: "#2f3020",
  muted: "#5b5c4e",
  subtle: "#76776a",
  border: "#cdcbd6",
  brand: "#d96846",
  brandInk: "#f7f3ee",
  mist: "#cdcbd6",
};


export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "app", "fonts");
  const [photo, anton, plex, plexBold] = await Promise.all([
    readFile(join(process.cwd(), "public", "profile-cutout.png")),
    readFile(join(fonts, "Anton-Regular.ttf")),
    readFile(join(fonts, "IBMPlexSans-Regular.ttf")),
    readFile(join(fonts, "IBMPlexSans-SemiBold.ttf")),
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
          fontFamily: "IBM Plex Sans",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "56px 72px 40px",
          }}
        >
          {/* Handle line — same as the hero */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: C.muted,
              fontSize: 24,
            }}
          >
            <span style={{ display: "flex" }}>
              <span style={{ color: C.brand }}>@</span>
              <span>lucmir</span>
            </span>
            <span style={{ color: C.subtle }}>·</span>
            <span>Senior Full-Stack Engineer</span>
          </div>

          {/* Middle: poster name + copy on the left, ID card on the right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 56,
              flex: 1,
              marginTop: 24,
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  fontFamily: "Anton",
                  fontSize: 150,
                  lineHeight: 0.92,
                  letterSpacing: "-0.01em",
                  textTransform: "uppercase",
                  color: C.brand,
                  marginLeft: -4,
                }}
              >
                {profile.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 34,
                  lineHeight: 1.25,
                  fontWeight: 600,
                  color: C.ink,
                  whiteSpace: "nowrap",
                }}
              >
                TypeScript · React · Node · AWS · AI agents
              </div>
            </div>

            {/* ID card, like the hero aside: grey-lilac portrait panel, terracotta frame */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 252,
                border: `2px solid ${C.brand}`,
                background: C.card,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 248,
                  height: 260,
                  background: C.mist,
                  borderBottom: `2px solid ${C.brand}`,
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
                    <span style={{ color: C.ink, fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer: red band, like the site footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 72px",
            background: C.brand,
            color: C.brandInk,
            fontSize: 22,
          }}
        >
          <span style={{ display: "flex", gap: 10 }}>
            <span style={{ color: C.mist }}>©</span>
            <span>lucas-cunha.com</span>
          </span>
          <span>Belo Horizonte · UTC−3</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "IBM Plex Sans", data: plex, weight: 400, style: "normal" },
        { name: "IBM Plex Sans", data: plexBold, weight: 600, style: "normal" },
      ],
    },
  );
}
