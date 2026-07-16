# Mobile PWA Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260716`

## System Boundary

The package contains browser-side modules under `src/` and browser-delivered resources under `web/`. It communicates with Alarisa only through contracts supplied or approved by the base project.

The base `@flancer32/alarisa` host resolves the package's published `web/` directory and maps it to `/mob/` through `@flancer32/teq-web`. Entry, manifest, service-worker, and asset references are relative to that assigned scope. The mobile service worker must not control the desktop application, API, hooks, or host routes.

## Ownership

The PWA owns browser presentation, browser-visible state, installation behavior, and offline-facing UI. The base Alarisa runtime owns identity, authorization, orchestration, memory, and capability execution.

## Constraint

The package provides the browser input for submitting a Principal contribution through the shared `comm` transport at `POST /api/v1/ingress/human`. It retains one stable `contributionId` across retry and sends `{contributionId, text, channel: "mob"}`. A `202` response means durable ingress acceptance; it is not an assistant event or a promise of an outcome. Transport validation, identity, authorization, signal creation, dialogue semantics, storage, and server-to-browser delivery remain outside this package.
