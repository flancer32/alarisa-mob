# Package Overview

`@flancer32/alarisa-mob` supplies Alarisa's mobile Principal-facing PWA. Server transport belongs to `@flancer32/alarisa-comm`.

Use this package from the `@flancer32/alarisa` host when it needs to:

- publish the package's `web/` directory at URL prefix `/mob/`;
- serve the PWA entry page, manifest, service worker, styles, and browser module;
- submit Principal contributions through `POST /api/v1/ingress/human` with stable identifiers.

The package does not provide identity, authorization, signal creation, dialogue storage, orchestration, assistant-event delivery, or a general API router. Those remain host responsibilities.

## Consumer Entry Points

- `web/` — the package-owned static source to map at `/mob/`.

The `Alarisa_Mob_` namespace is declared in package metadata and should be included in normal TeqFW namespace discovery.
