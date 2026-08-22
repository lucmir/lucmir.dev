import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
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
const TITLE = `${profile.name} · Senior Full-Stack Engineer · AI Agents & Cloud Infra`;
const DESCRIPTION = `Personal site of ${profile.name}, a full-stack engineer building AI agents and the cloud infrastructure they run on.`;

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
  themeColor: "#fbfbfa",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Senior Full-Stack Engineer, AI Agents & Cloud Infrastructure",
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
    "Full-Stack Development",
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
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
