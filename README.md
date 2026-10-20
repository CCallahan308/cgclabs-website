# CGC Labs website (cgclabs.org)

Static multi-page site. Data engineering is the primary practice; healthcare analytics and storefront websites remain available. Plain HTML, no build step.

## Structure
- `index.html`: data engineering offer, operating experience, secondary services, method, operator note, contact.
- `analytics.html`: healthcare BI: offer, method, verified proof, consulting-firm subcontract lane, locked pricing.
- `website.html`: storefronts for independent retailers leaving Etsy and eBay.
- `data-engineering.html`: legacy data extraction, quality checks, datasets for analytics and ML/AI, scheduled pipelines, lineage, and handoff.
- `assets/style.css`: design tokens and components (mirrors `../02 - Brand and Web/Website Theme Bible.md`).
- `assets/site.js`: mobile drawer, nav scroll state, metric count-up.

## Preview
Open `index.html` in a browser, or run `python -m http.server 8000` here and visit http://localhost:8000.

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

## House rules (from ../CLAUDE.md, enforced by TESTING.md)
- Only the verified proof points: 22-point NPS lift, first-ever 75th percentile, $150K vendor replaced, $10K/yr savings, 200+ reports/submissions with zero missed deadlines, 4 years in-house BI, Veradigm-to-Paragon BI-side alongside Altera.
- Prior employer is always "a rural Critical Access Hospital in the Midwestern US." Never named.
- Prices: $8,500 diagnostic and $15,000/mo retainer appear on analytics.html only, in exactly that form.
- No hype words, no emojis, no em dashes, first-person founder voice.

## To fill later
- Calendly URL (currently mailto CTAs to christian.g.callahan@cgclabs.org)
- OG image, robots.txt, sitemap when the domain goes live
