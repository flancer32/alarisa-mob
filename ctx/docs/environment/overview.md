# Mobile PWA Environment Overview

- Path: `ctx/docs/environment/overview.md`
- Changed: `20260713`

## Runtime Model

Package tooling runs on Node.js 20 or newer. The delivered application runs in a browser that supports the chosen PWA capabilities.

## Constraints

The host must publish this package's `web/` directory at the web-origin root so the manifest and service worker have root URL paths and the PWA can be installed on a mobile device. The package must not assume a specific backend host, deployment topology, browser framework, offline data strategy, push delivery, or server-to-browser delivery mechanism until those are explicitly defined.
