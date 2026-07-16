# Mobile PWA Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260716`

## System Boundary

The package contains browser-side modules under `src/` and browser-delivered resources under `web/`. It communicates with Alarisa only through contracts supplied or approved by the base project.

The base `@flancer32/alarisa` host resolves the package's published `web/` directory and maps it to `/mob/` through `@flancer32/teq-web`. Entry, manifest, service-worker, and asset references are relative to that assigned scope. The mobile service worker must not control the desktop application, API, hooks, or host routes.

## Ownership

The PWA owns browser presentation, browser-visible state, installation behavior, and offline-facing UI. The base Alarisa runtime owns identity, authorization, orchestration, memory, and capability execution.

The public mobile shell uses the shared `comm` WebAuthn client to restore or establish the one fixed Principal session and never owns server authentication policy. Its local policy explicitly locks through logout and after 15 minutes continuously in the background; foreground inactivity alone does not lock.

## Constraint

The package authenticates through shared `comm` browser contracts, then provides browser input for submitting a Principal Message at `POST /api/v1/ingress/human`. It retains one stable `contributionId` across retry and sends `{contributionId, text, channel: "mob"}`. `contributionId` is the current legacy transport-field name for the stable Principal Message identifier, not canonical domain terminology; renaming it to `messageId` requires a coordinated code and API migration. A `202` response means durable ingress acceptance and does not determine semantic meaning, signal creation, or an outcome. Trusted verification, authorization, dialogue semantics, storage, and server-to-browser delivery remain outside this package.
