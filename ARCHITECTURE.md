# ARCHITECTURE: cgclabs-website

## System fit
One of four sibling site projects in the CGC Labs library (with `measuremap-marketing-site`, `portfolio-website`, and the published cgclabs.org). This one is the practice site: home plus three customer-facing service pages.

- **Pages:** `index.html` (router to three practices, proof, method, contact) · `analytics.html` (healthcare BI, Lane A + Lane B) · `website.html` (storefronts for independent retailers) · `data-engineering.html` (legacy data ETL/classification for ML/AI).
- **Stack:** static HTML5, one shared stylesheet, one small vanilla JS file. No framework, no package manager, no build step. Deliberate choice; see DECISIONS.md.
- **Design source:** Website Theme Bible (tokens, type scale, components). Implemented by hand in `assets/style.css`.
- **Fonts:** Google Fonts via `<link>` (Theme Bible §8.3 Option B, the blessed static-deploy path).
- **Contact:** `mailto:christian.g.callahan@cgclabs.io`. No form backend, no Calendly URL available yet [to fill if a Calendly link is added].

## Boundaries
- Copy and claims are governed by the library `../CLAUDE.md` non-negotiables. This repo's code never overrides those.
- This site does not host MeasureMap product copy; that stays on the MeasureMap site. MeasureMap is referenced on the analytics page only as the bundled proprietary registry.

## Ownership
Solo operator (founder) owns content decisions; agents edit files under the guardrails above.
