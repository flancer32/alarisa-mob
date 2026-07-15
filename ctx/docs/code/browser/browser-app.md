# Browser Application Overview

- Path: `ctx/docs/code/browser/browser-app.md`
- Changed: `20260713`

## Purpose

Describe the `@flancer32/alarisa-mob` mobile PWA client package.

## Delivery Model

The package delivers an installable PWA browser client. Its `web/` directory contains the entry document, manifest, service worker, icons, and application resources. The base Alarisa host publishes that directory at URL prefix `/`, which gives the manifest and service worker their required root URL paths without copying them into the host repository.

The browser framework and routing model are undecided. The manifest and service worker are required PWA resources; their detailed fields and caching strategy remain implementation work.

## Entry Points

The initial browser entry is the Principal's Alarisa chat experience at `/`. It must allow the Principal to enter and submit a message for server processing.

`/manifest.webmanifest` and `/sw.js` are browser entry resources for installation and service-worker registration. They are package-owned resources delivered by the host mapping.

## Main User Flows

1. The Principal opens or installs the PWA and reaches the chat page.
2. The Principal enters and submits a message.
3. The page shows that the message is being processed, then presents a returned outcome or a clear unavailable/error state.

For the first vertical slice, the page submits `POST /api/ingress/human` with `{ "text": string }` to its own origin. A `202` response confirms only that ingress accepted the Principal contribution for processing. The page must not represent this acknowledgement as an assistant event or an eventual outcome. Authentication, the response's optional metadata, and the method by which later assistant events reach the browser remain runtime concerns; SSE is a candidate only.

## Accessibility Baseline

User-visible controls, status, errors, and chat interaction must remain operable with keyboard and assistive technology.

## Bootstrapping And Initialization

Initialization registers PWA resources when supported by the browser, establishes the initial visible state, and exposes loading and unavailable outcomes rather than assuming that the base runtime is reachable. It must not persist chat history, credentials, or an offline message queue until their ownership and lifecycle are approved.
