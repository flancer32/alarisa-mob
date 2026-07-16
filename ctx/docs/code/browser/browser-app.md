# Browser Application Overview

- Path: `ctx/docs/code/browser/browser-app.md`
- Changed: `20260716`

## Purpose

Describe the `@flancer32/alarisa-mob` mobile PWA client package.

## Delivery Model

The package delivers an installable PWA browser client. Its `web/` directory contains the entry document, manifest, service worker, icons, and application resources. The base Alarisa host publishes that directory at `/mob/`; relative resource URLs and explicit worker scope keep control inside the mobile application.

The browser framework and routing model are undecided. The manifest and service worker are required PWA resources; their detailed fields and caching strategy remain implementation work.

## Entry Points

The initial browser entry is the Principal's mobile Alarisa contact experience at package-relative `./`, published as `/mob/`. It allows the Principal to enter and submit a message for server processing.

`./manifest.webmanifest` and `./sw.js` are package-owned installation resources within the assigned mobile scope.

## Main User Flows

1. The Principal opens or installs the public PWA shell.
2. The page restores a valid opaque session, registers a passkey from an administrator enrollment URL, or requests passkey authentication; there is no account selection.
3. The unlocked Principal enters and submits a message.
4. The page shows durable ingress acknowledgement or a clear unavailable/error state.

The page submits `POST /api/v1/ingress/human` with `{contributionId, text, channel: "mob"}` to its own origin after authentication. `contributionId` is the current legacy transport-field name for the stable Principal Message identifier, not canonical domain terminology; renaming it to `messageId` requires a coordinated code and API migration. The page retains it across retry until `202`. A `202` confirms durable ingress acceptance only; it does not determine Message meaning or produce a Signal. A `401` returns the surface to locked state. Later assistant-event delivery remains undeclared.

Explicit lock revokes the server session. Remaining continuously in the background for 15 minutes also revokes it and removes the message form from visible state. Foreground inactivity does not lock. If the server is unavailable, the PWA stays locked.

## Accessibility Baseline

User-visible controls, status, errors, and chat interaction must remain operable with keyboard and assistive technology.

## Bootstrapping And Initialization

Initialization registers PWA resources, checks safe server session status, and exposes authentication, enrollment, locked, unlocked, and unavailable outcomes. The shared client calls native WebAuthn but neither it nor this package can read private keys, biometric data, or the `HttpOnly` session cookie. The PWA must not persist chat history, Principal data, credentials, or an offline message queue.
