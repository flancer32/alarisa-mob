# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260716`

## Code Structure

`web/` contains the PWA entry document, relative-scope manifest and service worker, icons, styles, and browser module. The base host publishes that directory at `/mob/`. `src/` reserves the `Alarisa_Mob_` namespace but contains no server handler.

## Engineering Constraints

Keep browser application behavior separate from server transport and authority. The browser calls the `comm`-owned `/api/v1/ingress/human` route with a stable contribution identifier. All package asset references remain relative to `/mob/`; no resource may require root scope or claim a host-global namespace. New source branches require a corresponding local `AGENTS.md` when their structure becomes non-obvious.
