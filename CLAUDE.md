# cgclabs-website

Static multi-page site for CGC Labs (intended to publish at cgclabs.org). Plain HTML + one CSS file + one small JS file. No build step, no dependencies.

## Current positioning (2026-10-20)
Data engineering for organizations of every size is the primary offer. Business analytics and storefront websites are secondary. Healthcare references describe verified prior work only; they do not define the audience. This user direction supersedes older healthcare positioning. Preserve compact copy. The October 22 user request authorizes a full UI rebuild; DESIGN.md and STYLE.md supersede earlier visual rules.

## Read first
The library-level rules apply here in full: `../CLAUDE.md` (non-negotiables, brand voice, method lexicon) and `../02 - Brand and Web/Website Theme Bible.md` (design tokens, components, copy bank). This file only adds project-local conventions.

## Files
- `index.html`, `analytics.html`, `website.html`, `data-engineering.html`: pages
- `assets/style.css`: all current design tokens and components; see DESIGN.md
- `assets/site.js`: mobile nav drawer and nav scroll state
- `assets/favicon.svg`

## Conventions
- Current contact email: `christian.g.callahan@gmail.com`. Use it in displayed addresses, every mailto link, and organization structured data until the user requests another change.
- Copy: first person, founder-voiced, short sentences. No hype words, no emojis, no em dashes in any new copy.
- Verified proof points only (see `../CLAUDE.md` #4). Prior employer stays "a rural Critical Access Hospital in the Midwestern US."
- Prices: only the locked numbers on `analytics.html` ($8,500 diagnostic, $15,000/mo). No prices on other pages.
- Follow DESIGN.md: Cabinet Grotesk and General Sans, forest ink, bright neutrals, lime contact panel, native workflow schematics, and restrained motion.

## Commands
- Preview: `vercel dev --listen 8000` in this folder, which handles the clean routes in `vercel.json`.
- Deploy: static hosting (Vercel/Netlify/GitHub Pages). See RUNBOOK.md.

## Verification before done
See TESTING.md. Run the banned-word and proof-point greps after any copy edit.
