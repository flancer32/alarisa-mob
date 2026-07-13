# PWA Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260713`

## System Boundary

The package contains browser-side modules under `src/` and browser-delivered resources under `web/`. It communicates with Alarisa only through contracts supplied or approved by the base project.

The base `@flancer32/alarisa` host resolves the package's published `web/` directory and maps it to URL prefix `/` through `@flancer32/teq-web`. Consequently `web/index.html`, `web/manifest.webmanifest`, and `web/sw.js` are delivered as `/`, `/manifest.webmanifest`, and `/sw.js`. Root URLs are a delivery property of the host mapping, not a reason to duplicate those files into the host repository.

## Ownership

The PWA owns browser presentation, browser-visible state, installation behavior, and offline-facing UI. The base Alarisa runtime owns identity, authorization, orchestration, memory, and capability execution.

## Constraint

The package provides the browser input for submitting a Principal contribution and a TeqFW PROCESS handler for its narrow ingress transport. The handler accepts `POST /api/ingress/human` with JSON `{ "text": string }`, validates the bounded text, and delegates acceptance to the host-owned ingress component. A `202` response means the host accepted the contribution for ingress processing; it is not an assistant event or a promise of an outcome. Identity, authorization, signal creation, dialogue semantics, storage, browser framework, and server-to-browser delivery remain owned by the base runtime. SSE remains a possible future choice, not a package contract.
