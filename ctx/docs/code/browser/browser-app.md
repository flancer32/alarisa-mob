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

1. The Principal opens or installs the PWA and reaches the chat page.
2. The Principal enters and submits a message.
3. The page shows that the message is being processed, then presents a returned outcome or a clear unavailable/error state.

The page submits `POST /api/v1/ingress/human` with `{contributionId, text, channel: "mob"}` to its own origin. It creates one contribution identifier for the current text and retains it across retry until `202`. A `202` confirms only durable ingress acceptance. The page must not represent this acknowledgement as an assistant event or eventual outcome. Authentication and later assistant-event delivery remain runtime concerns.

## Accessibility Baseline

User-visible controls, status, errors, and chat interaction must remain operable with keyboard and assistive technology.

## Bootstrapping And Initialization

Initialization registers PWA resources when supported by the browser, establishes the initial visible state, and exposes loading and unavailable outcomes rather than assuming that the base runtime is reachable. It must not persist chat history, credentials, or an offline message queue until their ownership and lifecycle are approved.
