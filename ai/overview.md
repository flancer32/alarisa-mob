# Package Overview

`@flancer32/alarisa-mob` supplies Alarisa's initial Principal-facing PWA and one narrow TeqFW ingress-transport handler.

Use this package from the `@flancer32/alarisa` host when it needs to:

- publish the package's `web/` directory at origin-root URL prefix `/`;
- serve the PWA entry page, manifest, service worker, styles, and browser module;
- accept a Principal contribution from `POST /api/ingress/human` and pass it to host ingress.

The package does not provide identity, authorization, signal creation, dialogue storage, orchestration, assistant-event delivery, or a general API router. Those remain host responsibilities.

## Consumer Entry Points

- `Alarisa_Mob_Back_Handler_HumanIngress$` — a TeqFW PROCESS handler for the PWA submission route.
- `web/` — the package-owned static source to map at `/`.
- `Alarisa_Back_Ingress_Human$` — required host component, not supplied by this package.

The `Alarisa_Mob_` namespace is declared in package metadata and should be included in normal TeqFW namespace discovery.
