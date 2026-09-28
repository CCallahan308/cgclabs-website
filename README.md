# CGC Labs website (cgclabs.org)

Static multi-page site: home, plus one page per practice (Healthcare Analytics, Storefront Websites, Data Engineering). Plain HTML, no build step.

## Structure
- `index.html`: home: three practices, method, anti-vendor promise, operator note, contact.
- `analytics.html`: healthcare BI: offer, method, verified proof, consulting-firm subcontract lane, locked pricing.
- `website.html`: storefronts for independent retailers leaving Etsy and eBay.
- `data-engineering.html`: legacy data ETL, classification, and delivery for ML/AI training.
- `assets/style.css`: design tokens and components (mirrors `../02 - Brand and Web/Website Theme Bible.md`).
- `assets/site.js`: mobile drawer, nav scroll state, metric count-up.

## Preview
Open `index.html` in a browser, or run `python -m http.server 8000` here and visit http://localhost:8000.

Live: https://ccallahan308.github.io/cgclabs-website/ (GitHub Pages, branch main, root). Repo: https://github.com/CCallahan308/cgclabs-website

## Deploy
Any static host: Vercel (preset "Other", output dir `.`), Netlify Drop (drag the folder), or GitHub Pages.

## House rules (from ../CLAUDE.md, enforced by TESTING.md)
- Only the verified proof points: 22-point NPS lift, first-ever 75th percentile, $150K vendor replaced, $10K/yr savings, 200+ reports/submissions with zero missed deadlines, 4 years in-house BI, Veradigm-to-Paragon BI-side alongside Altera.
- Prior employer is always "a rural Critical Access Hospital in the Midwestern US." Never named.
- Prices: $8,500 diagnostic and $15,000/mo retainer appear on analytics.html only, in exactly that form.
- No hype words, no emojis, no em dashes, first-person founder voice.

## To fill later
- Calendly URL (currently mailto CTAs to christian.g.callahan@cgclabs.io)
- OG image, robots.txt, sitemap when the domain goes live
