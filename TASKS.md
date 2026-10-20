# TASKS: cgclabs-website

## Current work (2026-09-27)
Build the three-practice static site per user directive: analytics, websites, data engineering; abilities-first; publish target cgclabs.org.

- [x] Scaffold docs (this set)
- [x] Design tokens + components in `assets/style.css`
- [x] `index.html`, `analytics.html`, `website.html`, `data-engineering.html`
- [x] `assets/site.js` (drawer, scroll state, count-up), favicon
- [x] Guardrail greps (TESTING.md 1-6) pass
- [x] Visual pass at desktop + mobile widths (ux-review)

## Acceptance criteria
- All four pages render correctly at 375px, 768px, 1280px.
- Every claim traces to a verified proof point or to a stated ability (no client counts, no status language).
- Locked pricing appears only on analytics.html, in the exact locked form.
- Testing.md items 1-8 all pass.

## Definition of done
TASKS boxes checked, TESTING table run and shown to the user, README handoff written.

## Redesign pass (2026-09-29)
- [x] Dribbble references viewed (museum / OneText / Longevity)
- [x] Index list replaces practice cards on home; brick CTA wall + ghost watermark on all four pages
- [x] Hero panel offset sheets, meta chips, statement quote, type scale up
- [x] TESTING.md greps 1-6 pass; desktop + mobile renders verified

## Follow-up pass (2026-09-29)
- [x] Email domain swapped to cgclabs.org on all surfaces
- [x] Vertical spacing tightened (sections, hero, CTA wall, index rows, footer, nav)
- [x] privacy.html and cookies.html written and linked site-wide

## Living background pass (2026-09-29)
- [x] assets/bg.js: drifting ledger dot field, hairline connections, three Brick accents, pointer repulsion (user options 1+4)
- [x] Canvas + script added to all six pages; stylesheet pinned at v=20260929-3
- [x] Verified: drift (canvas checksum moves), reduced-motion static frame, repulsion (near-pointer region changes 8.7x control), mobile 390px, no console errors

## Data engineering focus (2026-10-19)

- [x] Confirm source: six live HTML pages and three shared assets match repository HEAD `1e15a9e` before editing.
- [x] Lead with data engineering on the homepage and dedicated service page.
- [x] Put data engineering first in desktop/mobile navigation and footers on all six pages.
- [x] Update search/social metadata and homepage structured description.
- [x] Preserve the design, existing proof points, contact address, and analytics pricing.
- [x] Review the source diff and run static checks.
- [ ] Verify rendered layouts at 375px, 768px, and 1280px, plus interactive accessibility. Browser policy blocked local preview access.
- [x] Merge and deploy as `283db04`; verify six production pages and three shared assets match the source.

| TESTING.md check | Observed result |
| --- | --- |
| 1. Banned words | Pass on all six HTML pages. |
| 2. Dash punctuation | Pass on edited HTML; no new en/em dashes in the diff. |
| 3. Proof points | Reviewed. Homepage and data engineering counters use existing 200+, 4 years, and zero missed deadlines. No new outcome numbers. |
| 4. Pricing | Pass. Analytics pricing section is unchanged; no numeric currency amounts on other pages. |
| 5. Employer/location | Pass. Employer stays anonymous; prohibited location is absent. |
| 6. Internal links | Pass. All 156 local links, resources, and anchors resolve. |
| 7. Desktop/mobile visual review | Pending. Browser policy blocked preview access. |
| 8. Accessibility | Static checks pass: one h1 per page, skip links, unique IDs, and active navigation. Keyboard, drawer, and reduced-motion behavior remain unverified. |

Both JavaScript files pass `node --check`. `git diff --check` passes. No build step exists for this static site. Local HTTP readiness requests timed out; HTTP serving was not verified.

## Shorter site (2026-10-20)

- [x] Reduce copy on all six pages: 3,067 to 1,071 main-content words (65% less).
- [x] Combine repeated sections; shorten headings, buttons, metadata, and footers.
- [x] Tighten responsive spacing without changing fonts, colors, or type sizes.
- [x] Preserve pricing terms, outcome counters, data engineering priority, and all existing bookmark targets.
- [x] Verify HTML nesting, headings, navigation, structured data, copy rules, and 135 local links/resources/anchors.
- [x] Screenshot all six production pages at 375px, 768px, and 1280px. No horizontal overflow or clipped text detected.
- [x] Check mobile menu open/close, Escape, skip link, and visible keyboard focus. No browser console errors captured.
- [x] Deploy `54b3059` through main; confirm production success.

At a 714px viewport, the homepage decreased from 5,404px to 2,766px. Review artifacts: workspace `../tmp/short-site-review/`, including 18 full-page screenshots and `responsive-results.json`. Motion code was unchanged; reduced-motion emulation was not run.
