# ARCHITECTURE: cgclabs-website

## System fit
One of four sibling site projects in the CGC Labs library (with `measuremap-marketing-site`, `portfolio-website`, and the published cgclabs.org). This one is the practice site: a data engineering homepage plus three customer-facing service pages.

- **Pages:** `index.html` (data engineering offer, operating experience, secondary services, method, contact) · `analytics.html` (business analytics, historical proof, and engagement terms) · `website.html` (storefronts for independent retailers) · `data-engineering.html` (legacy data extraction, quality checks, analytics and ML/AI datasets, pipelines, lineage, and handoff).
- **Stack:** static HTML5, one shared stylesheet, one small vanilla JS file. No framework, no package manager, no build step. Deliberate choice; see DECISIONS.md.
- **Design source:** DESIGN.md and STYLE.md (tokens, type scale, components). Implemented by hand in `assets/style.css`.
- **Fonts:** Cabinet Grotesk and General Sans through official Fontshare CSS links, with swap and system fallbacks. No font binaries in the public repository.
- **Contact:** `mailto:christian.g.callahan@cgclabs.org`. No form backend, no Calendly URL available yet [to fill if a Calendly link is added].

## Boundaries
- Copy and claims are governed by the library `../CLAUDE.md` non-negotiables. This repo's code never overrides those.
- This site does not host MeasureMap product copy; that stays on the MeasureMap site. MeasureMap is referenced on the analytics page only as the bundled proprietary registry.

## Ownership
Solo operator (founder) owns content decisions; agents edit files under the guardrails above.
