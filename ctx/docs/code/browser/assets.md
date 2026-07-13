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

## Color Palette

Derived from the avatar (`alarisa2-512.webp`, dominant hue ≈ 26° / warm orange):

| Role | Color | Usage |
|------|-------|-------|
| Page background | `#f7efe6` | Warm cream, page backdrop |
| Surface | `#ffffff` | White, card backgrounds (status, outcome) |
| Primary text | `#2b1d12` | Warm dark brown, body and heading text |
| Secondary text | `#8c6a4d` | Medium warm brown, eyebrow label |
| Primary accent | `#d96d1a` | Orange, interactive elements (button, focus ring) |
| Accent hover | `#bf5a0e` | Darker orange, button hover |
| Border | `#dcc9b8` | Warm beige, input border |
| Surface border | `#e6d6c8` | Light warm beige, card border |
| Success bg/fg | `#eaf4ea` / `#2d6b3d` | Accepted state (warm-tinted green) |
| Error bg/fg | `#fce8e0` / `#8b3a2a` | Error/offline state (warm-tinted red) |
| Theme color | `#2b1d12` | Browser chrome and manifest theme |

The scheme is monochromatic warm (orange → amber → brown). Avatar accent colors (`#E76A18`, `#EF8F30`) inspired the interactive accent; dark brown tones (`#371E11`, `#592710`) set text and chrome colors.

Fonts, illustrations beyond the avatar, and licensing remain not yet defined.
