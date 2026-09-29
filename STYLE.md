# STYLE: cgclabs-website

Design tokens implemented in `assets/style.css`; source of truth is `../02 - Brand and Web/Website Theme Bible.md` (§3 system, §4 components, §9 guardrails), as reworked 2026-09-29 by user directive toward three Dribbble references (Nixtio art-museum editorial, Phenomenon OneText, Emote Longevity). The rework is light and editorial; see DECISIONS.md #10.

## Palette
Paper #F7F4EE (page) · Bone #FBF9F4 (cards/alt sections) · Vellum #FFFFFF (hero panel, statement quote) · Slate Ink #14130F (footer) · Ledger Ink #161512 (headings/primary) · Pitch #2A2823 (body) · Charcoal #403D38 · Graphite #5E5A52 (captions) · Slate #8B8578 (secondary) · Stone #D9D3C6 (hairlines) · Brick 70 #8B2E1F (accent). The one sanctioned large Brick fill is the closing CTA wall (one per page, museum red-field move); Paper-on-Brick passes AAA (6.1:1).

## Type
Source Serif 4 (display/headings) · Inter (body/UI) · JetBrains Mono (all numerals, eyebrows, captions-of-record). Overlines: 12px, 600, uppercase, 0.12em, Brick, leading dash; section-head overlines carry a trailing Stone rule. H1 clamps to 76px desktop with tight 1.02 leading; H2 to 48px; body-lg 20px serif; body 16px Inter. Practices render as an oversized serif index list (`.index-list`): parenthesized mono index, roman name with italic second word, description under, arrow right.

## Components (2026-09-29 additions)
- **CTA wall** `.cta-dark`: full-bleed Brick, Paper serif headline, ghost italic serif watermark (`.ghost`, per-page word) at 12% opacity, mono contact line, Paper button.
- **Hero panel** `.hero-visual`: Vellum card with two offset Bone sheets via layered box-shadows (Longevity stacked-panel move).
- **Meta chips** `.hero-meta span`: mono 12px in Stone hairline boxes.
- **Statement quote** `.pull-quote`: Vellum panel, 3px Brick left border, serif italic up to 28px.
- **Index annotations** `.num`/`.idx`: parenthesized mono indices "(01)" on cards, steps, blocks, index rows.

## Rules
- Sharp corners: 4px buttons, 4-6px cards, 2px inputs/chips, 0 on tables/rules.
- Hairlines are 1px Stone, never darker.
- Numbers are the imagery: JetBrains Mono, tabular figures, units at 0.55em.
- Motion: 150-250ms ease-out; count-up 800ms once; everything gated by prefers-reduced-motion.
- No gradients, no glassmorphism, no stock photography, no icons beyond line SVG and text arrows.
- Nav: sticky, transparent to Paper after 80px scroll; active link gets Brick underline + aria-current.
- Stylesheet loads with a version query (`style.css?v=YYYYMMDD`); bump it on any CSS change so visitors and Vercel never see stale styles.
