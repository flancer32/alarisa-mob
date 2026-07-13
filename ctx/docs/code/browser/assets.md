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

## Resource Inventory

- `favicon.ico` — legacy favicon derived from the Alarisa source artwork;
- `icon.svg` — SVG vector icon used as the primary manifest icon (any size);
- `icon-192.png` / `icon-512.png` — PNG raster icons for PWA installation, generated from the source favicon.png (192×192 and 512×512, maskable);
- `alarisa2-512.webp` — Principal-facing avatar displayed on the chat page, circular-cropped via CSS;
- `app.css` — application styles (mobile-first);
- `app.js` — browser application module.

Fonts, illustrations beyond the avatar, and licensing remain not yet defined.
