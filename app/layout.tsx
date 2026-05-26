import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ConsoleHello } from "@/components/console-hello";
import { profile } from "@/lib/cv-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#282828",
  colorScheme: "dark",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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
