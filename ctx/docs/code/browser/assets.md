# Browser Assets

- Path: `ctx/docs/code/browser/assets.md`
- Changed: `20260713`

## Asset Boundary

Browser-delivered static assets belong in `web/` and remain owned by this package even when the base host maps them to origin-root URLs.

## Required Resource Roles

- `index.html` — browser entry document for the chat page;
- `manifest.webmanifest` — installation metadata;
- `sw.js` — root-scoped service-worker entry;
- application icons — install and browser identity assets;
- browser modules, styles, and other static application resources — page presentation and behavior.

Exact icon set, visual identity, fonts, illustrations, licensing, and service-worker cache policy are not yet defined.
