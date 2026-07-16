# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260716`

## Code Structure

`web/` contains the PWA entry document, relative-scope manifest and service worker, icons, styles, and browser module. The base host publishes that directory at `/mob/`. The browser module imports the shared `@flancer32/alarisa-comm` WebAuthn client from `/_assets/comm/auth.js`. `src/` reserves the `Alarisa_Mob_` namespace but contains no server handler.

## Engineering Constraints

Keep browser application behavior separate from server transport and authority. The browser checks session status, uses the `comm`-owned WebAuthn client, and calls the protected `/api/v1/ingress/human` route with a stable message identifier. Package-owned asset references remain relative to `/mob/`; the only host-global browser dependency is the assigned public `/_assets/comm/auth.js` module. The application never reads or persists the `HttpOnly` session cookie. New source branches require a corresponding local `AGENTS.md` when their structure becomes non-obvious.
