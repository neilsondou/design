# Dou Design — Visual Foundations

This document defines the visual grammar behind Dou Design. Values are reference CSS pixels at a 1× viewport scale. Preserve perceived proportions when mapping them to another unit system.

## 1. Character and composition

Dou Design is quiet, warm, precise, personal, and editorial. It makes information feel clear rather than clinical. Numbers and useful content lead; decoration stays secondary. The interface should feel considered and tactile without imitating physical paper or adding effects that compete with information.

Its signature comes from the pairing of a nearly black night canvas and a warm oat canvas; pale or cream card planes; restrained sage; broad rounded corners; close, tabular numerals; soft pills; and open spacing. Both themes share the same semantic assignments and composition.

### Design priorities

1. Clear hierarchy and readable content.
2. Stable alignment, rhythm, and grouping.
3. Accurate theme surfaces and typography.
4. Quiet interaction feedback and accessible states.
5. Decoration only when it carries meaning.

Do not add gradients to page backgrounds, neon accents, glowing edges, textured backdrops, glass over every surface, or extra color families. A decorative circular ring is permitted only in the specified goal and conversion cards.

## 2. Color system

Color literals in this table are opaque hex for solid colors or `#AARRGGBB` where an alpha channel is shown. Alpha colors composite over the surface beneath them; they are not independent solid swatches. The JSON token file preserves the complete theme palette, including overlays and chart tones.

| Semantic role | Night theme | Paper theme | Use |
|---|---|---|---|
| Canvas | `#000000` | `#F4EFE5` | Full page background |
| Main control | `#F5F5F7` | `#2C2820` | Primary action and selected solid control |
| Card | `#D9141416` | `#F5FFFDF7` | Main content card |
| Main text | `#F5F5F7` | `#29251E` | Titles and primary values |
| Secondary text | `#A8F5F5F7` | `#A629251E` | Supporting copy and metadata |
| Tertiary text | `#66F5F5F7` | `#7329251E` | Quiet notes, dates, and hints |
| Sage accent | `#A8BFA8` | `#728E71` | Progress, focus, selected icons, charts |
| Deep sage | `#C2D6C1` | `#4D6B50` | Accent text and icons requiring more contrast |
| Soft sage | `#24A8BFA8` | `#1F557A58` | Low-emphasis selected fill |
| Warm ochre | `#D9A77A` | `#A56F3E` | Breakfast and warm data series |
| Cool slate | `#A9B7C9` | `#5E7186` | Dinner and cool data series |
| Warning terracotta | `#E29379` | `#B2553D` | Errors, over-target states, validation |
| Destructive red | `#FF453A` | `#C4332A` | Irreversible removal only |

### Surface hierarchy

- The canvas is flat and uninterrupted.
- Main cards use `glassBlack`, a near-opaque theme card, plus a 1 px hairline border. This token name describes the legacy role; the value is light in the paper theme.
- Secondary surfaces use `glass`, `glassStrong`, `surfaceMuted`, or `fieldFill` as defined in the tokens.
- Solid controls use `surface`; their foreground uses the canvas color.
- Sheets, dialogs, toast, dock, tab bar, and photo overlays each have their own tokens. Do not reuse card fill indiscriminately.
- Selected controls use a distinct inset thumb or a solid control fill. Selection must remain obvious in grayscale.

### Semantic color assignment

- Breakfast: `warm`; lunch: `accent`; dinner: `cool`; snack or other: warning/ochre family.
- Normal progress: sage. Over-target progress: warm into warning.
- Destructive actions: danger foreground and low-alpha danger fill/border.
- Weight trend: decreasing sage, increasing warm, stable tertiary.
- Body composition: low secondary, standard sage, high warm, very high warning.
- Neutral empty states: secondary text on a muted surface.
- Do not tint ordinary content by category. Pair color status with text, shape, or icon.

## 3. Typography

Use the bundled Meican Sans family where available for Latin text and numerals. Use platform-appropriate Chinese sans fallback while keeping the same visual weight and line rhythm. Font family names for Chinese fallbacks: 苹方, 微软雅黑, 思源黑体, Noto Sans CJK SC.

Do not replace this system with a geometric display face, thin fashion font, or decorative rounded face. Prefer regular 400 and semibold 600. Large titles may appear bold at 600. Keep secondary copy regular or medium. Use tabular figures for all measurements, dates where alignment matters, and chart labels.

| Role | Size | Line height | Weight | Tracking | Color |
|---|---:|---:|---:|---:|---|
| Large page title | 38 | 1.04 | 600 | −1.3 | ink |
| Page title | 32 | 1.08 | 600 | −0.9 | ink |
| Section title | 21 | 1.20 | 600 | −0.4 | ink |
| Headline | 17 | 1.30 | 600 | −0.2 | ink |
| Body | 16 | 1.50 | 400 | 0 | ink |
| Callout | 15 | 1.50 | 400 | 0 | secondary |
| Footnote | 13 | 1.50 | 400 | 0 | secondary |
| Caption | 12 | 1.40 | 500 | 0 | secondary |
| Eyebrow | 12 | 1.20 | 600 | +0.4 | accentDeep |
| Numeric hero | 68 | 0.95 | 600 | −3.0 | ink |
| Numeric large | 44 | 1.00 | 600 | −1.8 | ink |
| Numeric card | 28 | 1.05 | 600 | −0.9 | ink |
| Numeric inline | 17 | 1.20 | 600 | −0.2 | ink |

Additional established styles: card label 13/600; explanatory card copy 13.5/1.7; note 11.5/1.6 tertiary; chart date 10.5 tertiary; display unit 14/500 secondary, card unit 11, tiny numeric suffix 9.5 tertiary. Use smaller styles only where the content remains comfortably legible at the actual device scale.

Keep units smaller, lighter, and baseline-aligned with their value. Avoid splitting a value from its unit across lines. Limit line length on explanatory copy. Do not use all caps for ordinary headings.

## 4. Spacing and responsive layout

The base spacing rhythm is 4 px. Common values are 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 34, 42, and 44. Use the exact named tokens where supplied; do not round them to a different grid.

### Reference mobile composition

- Main page inset: 24 px horizontally; secondary back affordance inset: 14 px.
- Top content inset: about 14–18 px after safe-area handling.
- Page title to first main card: 28–30 px.
- Major section gap: 42 px; settings sections: 44–52 px.
- Related cards: 10–16 px apart; controls within a cluster: 8–14 px.
- Default card padding: 24 px; hero card: 26 px; compact grouped rows: 18–20 px horizontally.
- Floating bottom navigation requires about 144 px of scroll tail, adjusted for safe area and actual dock height.
- Content max width: 760 px. Keep the reference mobile composition centered when a wider viewport is available.

### Responsive behavior

Use these viewport bands as composition guidance, not forced breakpoints: compact below 600 px; medium 600–1023 px; wide 1024 px and above. On compact screens, keep the reference 24 px inset unless available width makes it impractical. On wider screens, cap reading width, center the main column, and use balanced side margins. Introduce columns only when related content remains easy to scan; do not stretch cards edge-to-edge across a desktop viewport.

Reflow multi-column controls before reducing text size. Keep touch targets usable, keep fixed actions reachable above the keyboard, and allow long lists to scroll. Use safe-area insets as part of layout rather than overlays that cover content.

## 5. Shape, borders, and depth

| Element | Radius |
|---|---:|
| Main card | 28 px |
| Sheet top corners | 36 px |
| Standard field/control | 18 px |
| Pill | 999 px |
| Tag | 10 px |
| Dialog | 40 px |
| Calendar day cell | 18 px |
| Date picker top | 32 px |

Use 1 px translucent outlines for cards and controls; 0.7 px for dividers; 1.2 px for focused outlines. Never outline every nested element. In grouped cards, align separators to the text column and keep the leading icon column visually clear.

Depth is broad and soft, never sharp. Reference card shadow: night `#66000000`, blur 32, y 18; paper `#1A6B5A3E`, blur 26, y 14. Raised surface: night `#80000000`, blur 44, y 22; paper `#246B5A3E`, blur 40, y 20. Control thumb: night `#59000000`, blur 14, y 5; paper `#14000000`, blur 10, y 3. Keep shadows subtle and omit blur when the host cannot render it cleanly. Avoid heavy elevation stacks.

## 6. Surface effects

- Page canvas: solid fill only.
- Cards: quiet fill, fine outline, optional soft shadow.
- Floating overlays may use backdrop blur only when text contrast remains stable; use the specified opaque theme surface as the base.
- Web or environments without dependable blur use opaque dock/tab/sheet tokens and no shadow.
- A large clipped ring motif is limited to forecast/goal and conversion result cards. It is a 190 px circle, 24–26 px outline, low-opacity `ring` token, placed partly beyond the upper-right card edge.
- Gradients belong only to data: calorie progress and chart bars where specified. Never use a gradient as a generic highlight.
- Disable default text underlines unless the text is an intentional link.

## 7. Iconography

Use one coherent outline icon family with filled variants reserved for selected or strongly emphasized states. Match the reference's light optical weight and simple silhouettes. Typical icon size is 18–22 px. Category badges use a 38–46 px square with radius about 32% of its size; the common badge is 40–44 px. Circular icon buttons have a 44 px target, 38–40 px visual circle, and 19–21 px glyph.

Common concepts: sunrise, sun, moon/stars, sparkles, gauge, cloud, calendar, camera, food tray/list, search, plus/minus, export/share, edit, arrow, and confirmation. Do not mix filled and outlined metaphors randomly, use emoji as icons, or add icon colors beyond semantic tokens. Pair icon-only controls with an accessible name and visible focus state.

## 8. Motion and feedback

Motion is restrained and functional. It confirms input, communicates selection, and supports spatial continuity. Never animate every card on page load or delay access to content.

| Interaction | Duration | Curve / response |
|---|---:|---|
| Press | 170 ms | ease-out cubic; scale 0.97 and opacity 0.90 |
| Segmented thumb | 300 ms | ease-out cubic |
| Selection | 240 ms | ease-out cubic |
| Calendar cell | 260 ms | ease-out cubic |
| Tab transition | 380 ms | fast-in / slow-out horizontal motion |
| Page enter / exit | 440 / 300 ms | native-like horizontal slide |
| Dialog | 220 ms | short fade/scale |
| Toast enter | 260 ms | fade and slight upward movement |
| Number count | 650 ms | smooth, settled finish |
| Weight / body-fat / weekly chart | 900 / 800 / 760 ms | draw in once, no looping |

Use no ripple by default. Press feedback is a slight scale and opacity change. Reduced-motion mode removes number counting and chart drawing, and replaces spatial transitions with quick fades or immediate state changes. Respect the user's motion preference even when the host platform offers a default animation.

## 9. Accessibility and content

- Maintain legible contrast on the actual composited surface, especially for translucent tertiary text. If a particular combination fails, raise opacity or use a solid surface while retaining the same semantic color.
- Never communicate status by color alone. Add text, shape, icon, or state semantics.
- Keep pointer and touch targets at least 44 × 44 px where practical. Separate adjacent destructive and safe actions.
- Provide a visible keyboard focus outline using deep sage, not a browser-default blue ring. Keep focus order aligned with reading order.
- Label fields persistently; placeholder text is not a label. Place validation beside the field and describe how to correct it.
- Preserve user text scaling and avoid clipping when type grows. Allow content to wrap or scroll before truncating.
- Give charts an accessible text summary and expose individual values to assistive technology.
- Confirm irreversible deletion. Make loading, success, and error states perceivable to assistive technology.
- Keep health estimates, AI recognition, data imports, and privacy explanations adjacent to the related action.
- Reference product copy is Simplified Chinese, calm and nonjudgmental. Never moralize food choices or claim estimates are exact.

## 10. Data visualization

Charts are secondary to the value and its explanation. Remove unnecessary gridlines and axes. Use a sage smooth line and low-alpha fade for weight; a warm line for body-fat estimates; seven narrow rounded bars for weekly intake with today's bar stronger; and a fine dashed reference line for target or estimated expenditure. Calorie progress is a 6 px round-ended track, sage when within target and warm-to-warning when over. Show dates and units where needed. Always provide a textual summary and values beyond color/shape.

## 11. Themes and token usage

The system ships with night and paper themes. Both retain the same semantic structure and component geometry. Theme selection changes surfaces and text contrast, not layout. Token values, including overlays and charts, are defined in `../tokens/design-tokens.json`.

When a new use case needs a missing token, add a semantic token rather than hard-coding a local color. Record the role, both theme values, and intended contrast/surface in the token file. Keep a clear separation between primitive values, semantic roles, and component recipes.
