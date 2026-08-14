# lucas-cunha.com

Personal site of **Lucas Cunha** — engineer building AI agents and the cloud infrastructure they run on.

Live at **[lucas-cunha.com](https://lucas-cunha.com)**.

![Screenshot of lucas-cunha.com](docs/screenshot.png)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components/PPR) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) with CSS variables for theming (light/dark)
- [IBM Plex Sans / IBM Plex Mono](https://www.ibm.com/plex/) via `next/font`
- [lucide-react](https://lucide.dev) for icons
- [Vercel Analytics](https://vercel.com/docs/analytics)
- Hosted on [Vercel](https://vercel.com)

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
pnpm build       # production build (Turbopack)
pnpm start       # serve the build locally
pnpm lint        # eslint
```

## Environment variables

| Variable               | Required | Purpose                                     |
| ---------------------- | -------- | ------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical site URL used in metadata, sitemap, and OG tags. Defaults to `https://lucas-cunha.com`. |
| `GITHUB_TOKEN`         | No       | GitHub GraphQL token for the contribution heatmap. Without it the activity section is hidden. |

## Project layout

```
app/
  layout.tsx              # root layout, metadata, JSON-LD Person schema, Analytics
  page.tsx                # composes all sections
  llms.txt/route.ts       # machine-readable CV (llms.txt convention), generated from cv-data
  opengraph-image.tsx     # dynamically generated 1200x630 social card
  sitemap.ts, robots.ts   # SEO metadata routes
  not-found.tsx           # custom 404
  icon.png, apple-icon.png
components/
  nav.tsx                 # sticky nav with mobile hamburger + section-active highlight
  company-timeline.tsx    # proportional career timeline bar in the hero (custom tooltip)
  heatmap-grid.tsx        # GitHub contribution heatmap grid
  reveal.tsx              # IntersectionObserver fade-up wrapper (respects prefers-reduced-motion)
  theme-toggle.tsx        # light/dark override, persisted to localStorage
  scroll-progress.tsx, back-to-top.tsx, console-hello.tsx, footer.tsx
  brand-icons.tsx         # inlined GitHub / LinkedIn SVGs (lucide v1 dropped brand icons)
  sections/               # hero, about, github-activity, experience, skills,
                          # certifications, education, contact
lib/
  cv-data.ts              # typed source of truth for all content
  github.ts               # GitHub GraphQL contribution fetch (cached hourly)
cv/
  cv.html, cv.css         # source for the one-page PDF CV (see CLAUDE.md to regenerate)
public/
  cert-*.jpg              # Anthropic certificate scans
  logo-*.png|svg          # company logos in the experience timeline
  eu-profile.png          # portrait (hero ID card)
  eu-serious.png          # portrait (JSON-LD / social)
  LucasCunha_cv.pdf       # downloadable CV, generated from cv/
docs/
  screenshot.png
```

## Deploy

Auto-deploys to Vercel on every push to `main`. Preview URLs for PRs.

To deploy manually:

```bash
pnpm dlx vercel --prod
```

## License

MIT.
