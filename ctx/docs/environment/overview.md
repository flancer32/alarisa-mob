# Mobile PWA Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Changed: `20260716`

## Runtime Model

Package tooling runs on Node.js 20 or newer. The delivered application runs in a browser that supports the chosen PWA capabilities.

## Constraints

The host publishes this package's `web/` directory at `/mob/`. Relative manifest, service-worker, and asset URLs keep installation and worker control inside that scope. The package must not assume a separate backend host, browser framework, offline data strategy, push delivery, or server-to-browser delivery mechanism until those are explicitly defined.
