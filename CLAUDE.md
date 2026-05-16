@AGENTS.md

## CV (one-page PDF)

The downloadable CV at `public/LucasCunha_cv.pdf` is generated from source files in `cv/`:

- `cv/cv.html` — content (markup, all text, tag lists)
- `cv/cv.css` — layout, typography, colors

### To edit

Open `cv/cv.html` and edit directly. Common edits:

- **Job duration / dates** — inside the `.job-date` `<p>` for each `.job` block
- **Skill tags** — add/remove `<span class="tag">…</span>` inside the relevant `.skill-tags` block. Categories: CORE STACK, DEVOPS, AI & AGENTS, WEB3 & IDENTITY, ENGINEERING PRACTICE
- **Summary paragraph** — `.summary` `<p>` in the right column
- **Education / Certifications** — `.col-right` Education section. The "Claude Certified Architect — Foundations" line uses `.edu-cert`
- **Languages** — bottom of left column, under Experience
- **Contact line** — banner at top: email, site, LinkedIn, location

For spacing / sizing tweaks, edit `cv/cv.css`:
- `.job { margin-bottom: 5mm; }` — vertical gap between job entries
- `.skill-cat { margin: 3.5mm 0 1.2mm 0; }` — gap between skill categories
- `.tag { font-size: 7pt; padding: 0.5mm 1.6mm; }` — chip size

### To regenerate the PDF

After any edit, re-render with headless Chromium:

```bash
/opt/homebrew/bin/chromium --headless --no-sandbox --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf=public/LucasCunha_cv.pdf \
  file:///Users/lucas/dev/lucas/my-site/cv/cv.html
```

Then verify:
- Open `public/LucasCunha_cv.pdf` in Preview and confirm it's still **exactly 1 page**
- If it overflows, tighten skill chip padding/font-size or condense an older role's bullet
- ATS-friendliness: text must remain selectable (it is, since Chromium produces real text PDFs from HTML)

The PDF is served directly at `/LucasCunha_cv.pdf` and downloaded from the Hero "Download CV" button — no rebuild needed for the Next.js app after replacing it.
