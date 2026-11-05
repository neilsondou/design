---
name: dou-design
description: "Create, extend, or reproduce interfaces in Dou Design: a calm, editorial, number-led visual system with warm paper and ink themes, restrained sage accents, rounded surfaces, and precise interaction patterns. Framework-agnostic; use for any frontend or product UI."
metadata:
  short-description: Dou Design system and portable UI skill
---

# Dou Design

Dou Design is a complete visual language and implementation brief. It defines the look, feel, layout, components, states, content behavior, and quality bar. It is independent of any programming language, frontend framework, platform, or component library.

Use this skill when a screen must look like Dou Design, when extending an existing Dou Design product, or when translating its visual language to another product. The system is useful on mobile, desktop, tablet, web, and embedded surfaces. Adapt interaction mechanics to the host; preserve visual identity.

## Read order and authority

1. Read `references/foundations.md` for visual principles, palette, typography, spatial rhythm, surfaces, iconography, motion, accessibility, and responsive rules.
2. Read `references/components-and-patterns.md` for component anatomy, states, overlays, charts, and reusable recipes.
3. Read `references/screen-blueprints.md` when reproducing the Mei Can reference product or its screen compositions.
4. Use `tokens/design-tokens.json` as the machine-readable source of exact reusable values.

If an implementation source is available, inspect it for current content, assets, and states. When source behavior conflicts with this system, preserve product behavior and apply Dou Design styling; document a material visual conflict. Do not infer unavailable content or invent records.

## Non-negotiable visual identity

- Flat black or warm-paper page canvas; no decorative page gradients, glows, grain, or ambient blobs.
- Quiet near-opaque cards with large rounded corners, delicate borders, and restrained depth.
- Sage is the primary accent. Warm ochre, slate, terracotta, and red have narrow semantic roles.
- Typography is calm and humanist. Strong contrast comes from scale and hierarchy, not a rainbow of text colors.
- Give important numbers room. Use tabular numerals, compact negative tracking at display sizes, and smaller aligned units.
- Prefer grouped rows, soft pills, subtle icon badges, thin separators, and generous whitespace.
- Avoid default system-blue controls, loud gradients, heavy outlines, hard shadows, ornamental glass effects, mixed icon families, and gratuitous animation.
- Use the exact supplied tokens where a role exists. Do not make local substitutes for convenience.

## Reproduction procedure

1. Identify viewport classes, theme, target screens, content, data states, and required interactions. Inspect supplied references and assets.
2. Establish semantic tokens and font fallbacks. Build the canvas, text hierarchy, surface primitives, controls, and overlays before composing full pages.
3. Implement every relevant state: initial, populated, empty, loading, error, disabled, selected, focused, success, and destructive confirmation.
4. Compose screens using the relevant blueprint. Keep content density, ordering, alignment, and whitespace consistent before fine visual polishing.
5. Adapt responsively without changing the visual hierarchy. Respect safe areas, keyboard visibility, text scaling, pointer input, and reduced-motion settings.
6. Compare rendered screens at the reference viewport. Correct canvas, content width, page insets, section rhythm, card geometry, type scale, and navigation placement first; then refine strokes, icons, and motion.

## Implementation contract

- Keep tokens centralized and semantic. Name values by purpose, not by component instance.
- Map reference pixels to the target environment while preserving perceived size and proportions. Avoid applying a density conversion twice.
- Use native idioms only when they match the same silhouette and behavior. Never let a platform default silently replace a specified color, font, radius, shadow, control, or transition.
- Preserve the language, punctuation, and line breaks provided by the product. For the reference product, UI copy is Simplified Chinese.
- Keep all important information available without relying on color, blur, hover, animation, or chart shape alone.
- Prefer stable layout and short transitions. Honor reduced motion, keyboard access, screen readers, and user text-size preferences.
- Keep components reusable and variants finite. Add a token only when a repeated need exists or the system lacks a semantic role.

## Completion criteria

A Dou Design screen is complete when its theme, composition, typography, spacing, surfaces, controls, interaction states, responsive behavior, accessibility, and content density match this brief; all visible elements use semantic tokens; and no unintended platform defaults or decorative additions remain.

## References

- [Visual foundations](references/foundations.md)
- [Components and interaction patterns](references/components-and-patterns.md)
- [Screen blueprints](references/screen-blueprints.md)
- [Machine-readable tokens](tokens/design-tokens.json)
