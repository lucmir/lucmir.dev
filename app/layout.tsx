import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
import { ConsoleHello } from "@/components/console-hello";
import { profile } from "@/lib/cv-data";
import "./globals.css";

/* Weights are trimmed to what the UI actually uses (400/500/600) — nothing
   renders at 300 or 700; bold-ish accents are font-semibold. Re-add a weight
   here if a new design element needs it. */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucas-cunha.com";
const TITLE = `${profile.name} — Senior Engineer · AI Agents · Cloud Infrastructure`;
const DESCRIPTION = `Personal site of ${profile.name} — engineer building AI agents and the cloud infrastructure they run on.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: SITE_URL },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f3" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a0e0c" },
  ],
  colorScheme: "light dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Full-Stack Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}/eu-serious.png`,
  sameAs: [profile.links.github, profile.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belo Horizonte",
    addressRegion: "Minas Gerais",
    addressCountry: "BR",
  },
  knowsAbout: [
    "AI Agents",
    "Model Context Protocol",
    "Claude Agent SDK",
    "Cloud Infrastructure",
    "AWS",
    "Kubernetes",
    "TypeScript",
    "Node.js",
    "Python",
    "Next.js",
    "React",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade Federal de Minas Gerais",
  },
};

/* Inline script: applies saved theme override BEFORE first paint, so dark
   mode users don't see a light flash (and vice-versa). Must be inline + run
   in <head>. Keeps in sync with components/theme-toggle.tsx. */
const themeInitScript = `
try {
  var t = localStorage.getItem('lc-theme');
  if (t === 'light' || t === 'dark') {
    document.documentElement.setAttribute('data-theme', t);
  }
} catch (e) {}
`;

/* Bryn attribution pixel (bryn.civic.com). Vendor-supplied loader kept
   verbatim — it sets the config global, then injects pixel.js itself. If Civic
   ships a new snippet, replace this whole string rather than editing pieces. */
const brynPixelScript = `
(function () {
  window.__brynPixel = { ref: "KA0C109Z" };
  var s = document.createElement('script');
  s.src = "https://bryn.civic.com/pixel/pixel.js";
  s.async = true;
  s.setAttribute('data-bryn-pixel-ref', "KA0C109Z");
  document.head.appendChild(s);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: needs to run pre-hydration
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <ConsoleHello />
        <Script
          id="bryn-pixel"
          strategy="afterInteractive"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: vendor pixel loader
          dangerouslySetInnerHTML={{ __html: brynPixelScript }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
