# Responsive Behavior

- Path: `ctx/docs/code/browser/responsive.md`
- Changed: `20260713`

## Baseline

The chat experience must remain usable as an installed application on narrow mobile screens and in a browser on wider desktop screens. Message composition, outcome visibility, and application status must remain reachable without horizontal scrolling at narrow widths.

## Mobile-First

Mobile is the primary interaction channel. All layout and styling decisions default to narrow-screen constraints first, with `@media (min-width: 600px)` breakpoints adding wider-screen adjustments:

- The avatar image is centered on mobile and left-aligned on wider viewports;
- The form, status, and outcome regions stack vertically and use the full available width on narrow screens;
- Desktop padding and font sizes are increased via `clamp()` and min-width media queries.

## Breakpoints

- `600px` — single breakpoint for desktop layout adjustments (avatar alignment, sizing). Additional breakpoints are not yet defined.
