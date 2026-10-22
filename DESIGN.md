# CGC Labs / Engineering studio

Rebuilt October 22, 2026 at the user's request. This replaces the earlier paper, serif, and Brick visual system. The audience remains organizations of every size hiring an independent data engineer.

## Visual idea

A clear route through complicated data. Use a bespoke routing diagram, large grotesk typography, precise rules, and generous but bounded whitespace. The diagram describes a workflow, not a live system or measured performance. No stock dashboards, customer logos, decorative particles, gradients, glass, or generic feature-card grids.

Brand identity: retain the original stacked CGC / LABS artwork in `assets/logo.png`. The user requested this logo to stay consistent with existing business cards. Do not replace it with the routing icon or redraw it as a new wordmark. The PNG is copied unchanged from the earlier site.

## Tokens

- Canvas `#f6f8f4`; white `#ffffff`; soft surface `#eaf0e9`.
- Forest ink `#142b24`; secondary ink `#526259`; rules `#d3ddd4`.
- Lime `#d5f36b`, used for action, a routing node, and one accent word.
- Display: Cabinet Grotesk 800. Body: General Sans 400/500/600. System sans fallbacks. Tabular figures for evidence.
- Official Fontshare CSS with `display=swap`. Fonts are not redistributed in this public repository. License: https://www.fontshare.com/licenses/itf-ffl.
- H1 clamp 56-100px, H2 36-64px, body 16-19px, labels 11-12px. Short line lengths, tight display leading.
- Container 1280px maximum; 48px desktop gutters, 24px tablet, 20px mobile. Sections 72-96px desktop and 52-64px mobile.
- Square composition edges; 4px buttons; rounded nodes only where the diagram needs them.

## Composition

Home: split hero and routing artwork, prior-work evidence strip, asymmetric service directory, three delivery steps, founder introduction, concise contact panel. Service pages: distinct schematic, deliverable rows, relevant evidence, contact. Analytics retains its engagement terms. Legal pages use a readable text column.

Navigation has three service choices and one email action. Preserve clean routes, metadata, bookmarks, and accessible dialog behavior. A fallback email and reply guidance accompany the closing action. Touch targets are at least 44px. No content waits for entrance animation.

## Motion and responsive behavior

Restrained 180-240ms interaction transitions. One small routing marker animates inside the hero artwork. Disable animation and smooth scrolling under reduced motion. No count-up numbers, custom scroll engine, or particle effects.

At 900px navigation changes to a modal drawer. Tablet heroes stack. On phones service rows, proof, steps, and contact stack. No fixed desktop canvas or clipped content.

## References and review

The supplied resource informed the order: references, system, components, motion, typography, review. https://www.siteinspire.com/ informed reference selection. https://boc.studio/ informed strong typographic identity; https://thisislandscape.com/ informed sparse framing and editorial pacing. Their assets and layouts are not reproduced. The DESIGN.md approach follows https://github.com/VoltAgent/awesome-design-md.

Review against the supplied 20 UX laws: one inquiry goal, limited choices, visible focus/states, grouped information, clear reading order, progressive service detail. Progress and form-input rules do not apply because the site has no multistep flow or form. Native keyboard and responsive checks are required alongside source tests.
