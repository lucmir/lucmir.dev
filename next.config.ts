import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Partial prerendering: static shell at build, cached/dynamic parts
  // revalidate per their cacheLife profiles (see lib/github.ts, hero.tsx).
  cacheComponents: true,
  images: {
    // Allow SVG sources for next/image (used by the UFMG logo).
    // Local-only assets in /public; CSP locks down execution surface.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
