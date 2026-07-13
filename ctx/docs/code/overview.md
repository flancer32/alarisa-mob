# Code Overview

- Path: `ctx/docs/code/overview.md`
- Changed: `20260713`

## Code Structure

`src/` contains ECMAScript modules in the `Alarisa_Pwa_` namespace, including the TeqFW handler that bridges the PWA submission route to a host-provided ingress component. `web/` contains resources delivered to the browser. The package keeps the PWA entry document, manifest, service worker, icons, styles, and browser modules there; the base host publishes that directory at URL prefix `/`.

## Engineering Constraints

Keep browser application behavior separate from base-runtime authority and backend contracts. `Alarisa_Pwa_Back_Handler_HumanIngress$` is registered by the host before its static handler and depends on `Alarisa_Back_Ingress_Human$`, whose `accept({text, channel})` operation is implemented by the base runtime. Browser resources that require root URL paths remain package-owned and rely on the host mapping rather than copies in the base repository. New source branches require a corresponding local `AGENTS.md` when their structure becomes non-obvious.
