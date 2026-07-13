# PWA Architecture Overview

- Path: `ctx/docs/architecture/overview.md`
- Changed: `20260713`

## System Boundary

The package contains browser-side modules under `src/` and browser-delivered resources under `web/`. It communicates with Alarisa only through contracts supplied or approved by the base project.

## Ownership

The PWA owns browser presentation, browser-visible state, installation behavior, and offline-facing UI. The base Alarisa runtime owns identity, authorization, orchestration, memory, and capability execution.

## Constraint

No backend endpoint, authentication mechanism, storage schema, or browser framework is established yet.
