# cgclabs-website

Static multi-page site for CGC Labs (intended to publish at cgclabs.org). Plain HTML + one CSS file + one small JS file. No build step, no dependencies.

## Read first
The library-level rules apply here in full: `../CLAUDE.md` (non-negotiables, brand voice, method lexicon) and `../02 - Brand and Web/Website Theme Bible.md` (design tokens, components, copy bank). This file only adds project-local conventions.

## Files
- `index.html`, `analytics.html`, `website.html`, `data-engineering.html`: pages
- `assets/style.css`: all design tokens and components (mirror of Theme Bible section 3)
- `assets/site.js`: mobile nav drawer, nav solid-on-scroll, metric count-up
- `assets/bg.js`: living ledger background (drifting dot field, hairline connections, pointer repulsion; static frame under prefers-reduced-motion; see DECISIONS.md #14)
- `assets/favicon.svg`

## Conventions
- Copy: first person, founder-voiced, short sentences. No hype words, no emojis, no em dashes in any new copy.
- Verified proof points only (see `../CLAUDE.md` #4). Prior employer stays "a rural Critical Access Hospital in the Midwestern US."
- Prices: only the locked numbers on `analytics.html` ($8,500 diagnostic, $15,000/mo). No prices on other pages.
- Sharp corners (2-6px), numbers in JetBrains Mono with tabular figures. One full-bleed Brick CTA band per page (the closing wall) is the sanctioned Brick fill; otherwise Brick stays an emphasis ink.

## Commands
- Preview: open any page in a browser, or `python -m http.server` in this folder.
- Deploy: static hosting (Vercel/Netlify/GitHub Pages). See RUNBOOK.md.

## Verification before done
See TESTING.md. Run the banned-word and proof-point greps after any copy edit.
