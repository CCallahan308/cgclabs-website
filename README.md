# CGC Labs website (cgclabs.org)

Static multi-page site. Data engineering for organizations of every size is the primary practice; business analytics and storefront websites remain available. Plain HTML, no build step.

## Structure
- `index.html`: data engineering offer, operating experience, secondary services, method, operator note, contact.
- `analytics.html`: business analytics: dashboards, metric governance, verified prior-work examples, subcontract work, locked pricing.
- `website.html`: storefronts for independent retailers leaving Etsy and eBay.
- `data-engineering.html`: legacy data extraction, quality checks, datasets for analytics and ML/AI, scheduled pipelines, lineage, and handoff.
- `assets/style.css`: design tokens and components from DESIGN.md.
- `assets/site.js`: mobile drawer and nav scroll state.

## Preview
Run `vercel dev --listen 8000` here and visit http://localhost:8000. Use Vercel's clean URL handling when testing navigation; a plain file server does not resolve the extensionless service routes.

Live: https://cgclabs.org (Vercel, project cgclabs-website, auto-deploy on push to main). Source repo: https://github.com/CCallahan308/cgclabs-website. Mirror: https://ccallahan308.github.io/cgclabs-website/

## Source check and current revision (2026-10-19)

The six HTML pages and three shared CSS/JS assets at `cgclabs.org` matched this repository's latest commit, `1e15a9eac6b017964e822eb1cacb1ed976996c39`, before editing. Comparison normalized line endings and surrounding whitespace. The older `cgc-labs` React repository did not match the live site. `cgclabs.com` served a parking page through `/lander` during the check.

The `codex/data-engineering-focus` branch makes data engineering lead in the homepage, service list, desktop/mobile navigation, metadata, and all footers. The service page now covers source extraction through documented handoff. The existing design, contact address, and analytics pricing remain in place.

Static checks passed across all six pages, including 156 local links, resources, and anchors. JavaScript syntax and `git diff --check` passed. Initial browser checks were blocked. The revision was merged and deployed as `283db04`; all six production pages and three shared assets matched the source.

## Shorter copy and pages (2026-10-20)

Main copy fell from 3,067 to 1,071 words across the six pages, a 65% reduction. Repeated sections were combined, headings and buttons shortened, and section spacing and footers tightened. Fonts, colors, data engineering priority, outcome counters, pricing, and payment terms remain in place.

Static checks pass for all 135 local links, resources, and anchors. Existing bookmark targets remain valid. Production screenshots and layout checks covered all six pages at 375px, 768px, and 1280px, with no horizontal overflow or clipped text detected. Menu open/close, Escape, skip link, and keyboard focus checks passed. At the same 714px browser width, homepage height fell from 5,404px to 2,766px. Screenshots and measurements are in the workspace's ignored `../tmp/short-site-review/` folder.

## Deploy
Any static host: Vercel (preset "Other", output dir `.`), Netlify Drop (drag the folder), or GitHub Pages.

## Search and broader positioning (2026-10-20)

The homepage and data engineering page address organizations of every size. Analytics is now a general business offer. Healthcare appears only in historical experience and results. Existing prices and proof figures remain unchanged.

Unique page metadata, clean canonical URLs, linked organization/service/breadcrumb data, `robots.txt`, and a six-page `sitemap.xml` support discovery. Run `node scripts/check-seo.mjs` before release. See RUNBOOK.md for Search Console setup; publishing these files does not confirm indexing or rankings.

## UX review fixes (2026-10-21)

Contact buttons now say "Email your project" and prefill sources, goal, and timeline prompts. Reply timing appears beside the action. The homepage hero keeps two metrics from prior in-house BI work. Detailed healthcare proof remains on the data engineering page.

The mobile menu hides closed controls from interaction, contains focus while open, restores background state and trigger focus on close, and closes at the desktop breakpoint. Focus outlines adapt to dark sections; helper text uses darker ink. Run `node scripts/check-ui.mjs` for the regression tests and `node scripts/check-seo.mjs` for search/link checks.

## House rules (from ../CLAUDE.md, enforced by TESTING.md)
- Only the verified proof points: 22-point NPS lift, first-ever 75th percentile, $150K vendor replaced, $10K/yr savings, 200+ reports/submissions with zero missed deadlines, 4 years in-house BI, Veradigm-to-Paragon BI-side alongside Altera.
- Prior employer is always "a rural Critical Access Hospital in the Midwestern US." Never named.
- Prices: $8,500 diagnostic and $15,000/mo retainer appear on analytics.html only, in exactly that form.
- No hype words, no emojis, no em dashes, first-person founder voice.

## To fill later
- Optional scheduling integration if direct booking replaces the current email inquiry.
- OG image for social previews

## Engineering studio rebuild (2026-10-22)

All six public pages use a new visual system: Cabinet Grotesk / General Sans, forest ink, bright neutrals, lime, and custom workflow diagrams. Layouts, navigation identity, service presentation, legal pages, and contact panels were rebuilt. Numbers remain static; the decorative particle background was removed. The phone and tablet homepage use a legible vertical routing diagram.

The rebuild preserves clean routes, search metadata and schema, existing bookmarks, verified historical proof, locked analytics terms, and email inquiry prompts. Fontshare replaces Google Fonts; privacy and cookie copy reflect it. See DESIGN.md for references and design decisions. All 32 source tests passed; browser checks covered six pages at 375, 768, and 1280px, with native menu/focus checks. Screen-reader operation, email delivery, and search rankings were not tested.
