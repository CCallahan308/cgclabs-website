# STYLE: cgclabs-website

Design tokens implemented in `assets/style.css`; source of truth is `../02 - Brand and Web/Website Theme Bible.md` (§3 system, §4 components, §9 guardrails).

## Palette
Paper #F7F4EE (page) · Bone #FBF9F4 (cards/alt sections) · Vellum #FFFFFF · Slate Ink #14130F (dark sections/footer) · Ledger Ink #161512 (headings/primary) · Pitch #2A2823 (body) · Charcoal #403D38 · Graphite #5E5A52 (captions) · Slate #8B8578 (secondary) · Stone #D9D3C6 (hairlines) · Brick 70 #8B2E1F (accent, max 3 uses per page) · Brick light #A1493C (on dark) · Verified Green #3F6B4A.

## Type
Source Serif 4 (display/headings) · Inter (body/UI) · JetBrains Mono (all numerals, eyebrows, captions-of-record). Overlines: 12px, 600, uppercase, 0.12em, Brick. H1 64/40px, H2 44/32px, body-lg 20px serif, body 16px Inter.

## Rules
- Sharp corners: 4px buttons, 6px cards, 2px inputs, 0 on tables/rules.
- Hairlines are 1px Stone, never darker.
- Numbers are the imagery: JetBrains Mono, tabular figures, units at 0.55em.
- Motion: 150-250ms ease-out; count-up 800ms once; everything gated by prefers-reduced-motion.
- No gradients, no glassmorphism, no stock photography, no icons beyond line SVG and text arrows.
- Nav: sticky, transparent to Paper after 80px scroll; active link gets Brick underline + aria-current.
