import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { ConsoleHello } from "@/components/console-hello";
import { profile } from "@/lib/cv-data";
import "./globals.css";

/* One grotesk for everything: Schibsted Grotesk (variable) at regular
   weight for body/UI and bold + tight tracking for display (name, section
   titles, numerals). IBM Plex Mono for data (dates, counts, tags). */
const sans = Schibsted_Grotesk({
  variable: "--font-sans-face",
  subsets: ["latin"],
});

// Mono is Plex. (Geist Mono was tried: its font URL fails to resolve
// under Turbopack in Next 16.2.6: "queries have exactly one entry".)
const mono = IBM_Plex_Mono({
  variable: "--font-mono-face",
  weight: ["400", "500"],
  subsets: ["latin"],
});


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lucas-cunha.com";
const TITLE = `${profile.name} · Senior Full-Stack Engineer · TypeScript, React, Node · AI Agents`;
const DESCRIPTION = `Personal site of ${profile.name}, a senior full-stack engineer shipping products end to end: UI, APIs, data, AI agents, and the cloud platform they run on.`;

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
  themeColor: "#f4f4f2",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Full-Stack Engineer",
  description: DESCRIPTION,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  image: `${SITE_URL}/profile.png`,
  sameAs: [profile.links.github, profile.links.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belo Horizonte",
    addressRegion: "Minas Gerais",
    addressCountry: "BR",
  },
  knowsAbout: [
    "Full-Stack Development",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "AI Agents",
    "Model Context Protocol",
    "Claude Agent SDK",
    "AWS",
    "Cloud Infrastructure",
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

/* Bryn visitor pixel (ref KA0C109Z). Kept as the vendor's inline loader so
   window.__brynPixel is set before pixel.js runs. See
   https://docs.civic.com/bryn/frontend-recipes */
const brynPixelScript = `
window.__brynPixel = { ref: "KA0C109Z" };
var s = document.createElement('script');
s.src = "https://bryn.civic.com/pixel/pixel.js";
s.async = true;
s.setAttribute('data-bryn-pixel-ref', "KA0C109Z");
document.head.appendChild(s);
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
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
        <Script id="bryn-pixel" strategy="afterInteractive">
          {brynPixelScript}
        </Script>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
