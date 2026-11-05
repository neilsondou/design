# Dou Design — Components and Interaction Patterns

This catalog describes appearance and behavior without requiring a specific UI toolkit. Reference dimensions are pixels at 1× scale. Use `tokens/design-tokens.json` for values that are shared across components.

## 1. Component recipes

| Component | Anatomy and default recipe |
|---|---|
| App canvas | Full viewport, solid theme background, safe-area aware. No ambient decoration. |
| Page header | Optional date/context eyebrow, 10 px gap, 38 px large title; trailing action aligned with title baseline. |
| Section header | 21/1.2/600 title, optional concise right action in deep sage with small chevron; 16 px bottom gap. |
| Surface card | 28 radius, 24 px padding (26 px for emphasized card), `glassBlack` fill, 1 px glass border; clip images to the same shape. |
| Grouped card | One shared parent surface; no separate card per row. Rows use 18 px horizontal and 14–17 px vertical padding. Dividers align beneath the text column. |
| Icon badge | 40–44 px square, radius 32% of size, low-alpha semantic fill, matching glyph. |
| Circle icon button | 44 px hit target; 38–40 px visual circle; 19–21 px icon; glass fill and border. |
| Primary button | Full width, 56 px high, pill radius, solid `surface`, foreground in canvas color. Optional leading icon. |
| Action pill | 58 px high. Primary is solid; secondary uses `glassStrong`. Icon 18 px, 9 px gap, label 15.5/600. |
| Compact action | 48–54 px high, 18 px radius, quiet fill and outline. |
| Segmented control | 46 px track, 4 px inset, translucent track, distinct animated thumb, 14 px label. |
| Choice pill | 42 px high, 18 px horizontal padding, 21 px radius. Selected state uses solid control fill. |
| Tag | 9 × 5 px padding, 10 px radius, 11/600 text; sage on soft sage by default. |
| Metric value | Quiet 11.5 px label, 5 px gap, 21/600 tabular value, 10.5 px unit. |
| Empty state | Centered icon in 46 px circle, 16 px gap, 18/600 title, 7 px gap, 14/1.6 muted explanation, optional action. |
| Search field | 18 px radius, low-contrast fill, 1 px outline, 19 px search icon, persistent label or accessible name. |
| Form field | 18 px radius, low-contrast fill, 1 px outline; focus uses 1.2 px deep-sage outline. Persistent label above; unit suffix stays aligned. |
| Sheet | Bottom overlay, 36 px top corners, 38 × 4 px handle, 22 px horizontal inset, opaque theme fill. Scroll and keyboard must not obscure actions. |
| Dialog | Centered, max width about 360 px, 40 px radius, 22 × 24 px inset, title 18.5 px, body 14.5 px, action 50 px high. |
| Toast | Near top below system inset; max width 430 px; 16 × 13 px inset; 22 px radius; icon and short text. Dismiss after about 2200 ms. |
| Floating tab bar | Capsule, 66 px high, 6 px inset, width 296–420 px, four equal tabs, selected inset pill, 20 px icon and 10.5 px label. |
| Save dock | Fixed at bottom with dock surface and top hairline; summary row above full-width primary action; respect safe area and keyboard. |

## 2. Shared interaction states

Every interactive element must account for:

- **Default:** calm surface, clearly readable label, expected cursor or affordance.
- **Hover:** use the low-alpha `hover` token; do not introduce a bright halo.
- **Pressed:** 170 ms feedback at 0.97 scale and 0.90 opacity; no ripple.
- **Keyboard focus:** visible deep-sage outline, at least 1.2 px, without layout shift.
- **Selected:** distinct fill/thumb plus text or icon change; never color alone.
- **Disabled:** no movement; keep text legible and geometry stable. Reduce emphasis without making essential information unreadable.
- **Busy:** retain control geometry, show a compact progress indicator, prevent duplicate submission, use concise status text.
- **Error:** terracotta plus corrective text near the cause; preserve entered values.
- **Success:** brief status confirmation and stable resulting state.
- **Destructive:** red is restricted to the removal action; require confirmation for irreversible deletion.

Inputs need empty, active, filled, invalid, and disabled states. A focused input changes only its outline and caret; do not recolor the entire field. Validation text appears next to the field, not only in a toast.

## 3. Navigation and page shell

The main shell uses a scrollable page with safe-area-aware content and a floating four-item tab bar on the reference mobile layout. Keep about 144 px of bottom scroll reserve so the last content row can clear the tab bar. Secondary screens expose a back affordance inset 14 px from the edge and a clear page title. Do not stack a second persistent navigation system on top of the floating tabs.

On wider viewports, center a column capped at 760 px. Keep the tab bar at a comfortable width and position it in relation to the content column. Use the same visual order and selected state across viewport classes.

## 4. Overlays

### Bottom sheets

Use the 36 px top corners, 38 × 4 px handle, theme sheet surface, and 22 px side inset. The heading has a clear title and optional one-line explanation. Content scrolls independently when necessary. Keep the primary action reachable above the keyboard; when needed, let the action dock remain anchored and move with the keyboard. Support dismissal through the established close/back mechanism and the host's expected gesture.

### Confirmation dialogs

State the consequence in the title or body, keep the safe action easy to find, and label the destructive action explicitly. Use warning/destructive color only for the destructive choice. Do not confirm routine reversible actions.

### Toasts and status messages

Use short, factual language. Toasts confirm completed actions; they must not contain the only copy of an error that requires correction. Keep status visible long enough to read and announce it to assistive technology.

### Fixed action docks

Use an opaque dock surface, a single top hairline, and a clear content summary where useful. Add safe-area padding. When a keyboard is open, move the dock above it or allow natural page scroll; never cover the active field or save control.

## 5. List patterns

- Use grouped cards for closely related settings, meals, and records.
- Keep row heights consistent within one group. Align primary text and secondary detail across rows.
- Put the main label first, supporting data below, and a concise value/action at the trailing edge.
- Use a thin inset divider between rows, not a gap plus individual outlines.
- Use an explicit empty state when a collection has no content. Include a useful next action when one exists.
- Search results should update without changing the surrounding geometry. Include a distinct no-results state.
- Show delete affordances only where needed. Explain swipe-to-delete and still provide an accessible action.

## 6. Form patterns

- Place a persistent label above each field; use hint text as an example, not as the label.
- Keep paired numeric fields equal in width with a 12 px gap where space permits.
- Put units inside the field boundary or directly beside the number.
- Use tabular numerals and right alignment for values that will be compared vertically.
- Keep help copy close to the field it qualifies. Put validation beside the invalid field.
- For multi-step or modal forms, keep the primary action in the same predictable location.
- On narrow viewports or large text sizes, stack paired fields before shrinking labels.

## 7. Chart recipes

### Weight trend

Default height 136 px (144 px when the page recipe needs more breathing room). Use a smooth 2.4 px sage curve, low-opacity sage area fading toward transparent, optional 4/5 dashed goal line, and a modest endpoint marker. Keep date labels tertiary and sparse.

### Body-fat trend

Height 94 px, 2.2 px warm line, subtle low-opacity area, visible endpoint and adjacent estimate caveat.

### Weekly intake

Height 118 px (up to 128 px when the surrounding card needs it). Seven narrow rounded bars; maximum bar width 18 px; today's bar uses stronger sage, previous days muted sage. Use a thin 4/5 dashed expenditure reference and quiet weekday labels.

### Calorie progress

Height 6 px, radius 3 px. Within target uses a soft-to-deep sage fill; over target shifts from warm to warning. Display target and remaining/excess as text.

Charts should animate once, on entry or data change. Provide a text summary and assistive values. Do not imply health accuracy beyond the source data.

## 8. Screen composition recipes

Use these recipes as reusable patterns. Exact reference product composition and copy is listed in [screen-blueprints.md](screen-blueprints.md).

### Dashboard

Large date-led heading → one emphasized summary card with hero number and progress → paired primary actions → grouped recent items → forecast card → quiet utility entry. Give the most important current value the greatest type scale and space.

### Calendar and records

Page heading → weekly calendar surface → daily summary → paired actions → section header → grouped entries or purposeful empty state. Date selection is clear, today is marked independently from selection, and unavailable future dates are visibly disabled.

### Trends

Current metric and goal → trend visualization → forecast → secondary estimate with caveat → recent-period summary → profile facts → recent records. Keep charts visually quiet and values easy to read.

### Settings

Profile summary → grouped display/input preferences → synchronization → export → small centered product signature. Do not turn settings into a marketing or analytics dashboard.

### Photo recognition

Explain the task → camera/gallery actions → photo preview → analyzing/empty/result state → editable grouped results → adjustment action → fixed save dock. Separate model explanation from editable data.

### Converter

Short context and explanation → mode selector → labeled input(s) → useful presets → emphasized result card → formula/caveat footnote.

### Screenshot import

Explain scope and privacy → capture/gallery actions → preview and analysis → unit selection → selectable parsed rows → explicit overwrite confirmation → result status.
