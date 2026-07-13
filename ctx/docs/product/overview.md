# PWA Package Overview

- Path: `ctx/docs/product/overview.md`
- Changed: `20260713`

## Purpose

This package supplies the PWA client through which the Principal interacts with Alarisa.

## Scope

In scope: browser delivery, installable PWA behavior, and the user-facing chat channel. The first useful browser action is entering and submitting a message to the base Alarisa runtime.

Out of scope: Alarisa runtime orchestration, memory ownership, external-service actions, and product authority decisions. Those remain in the base Alarisa project.

## Invariants

- The package serves a single Principal's private Alarisa instance.
- It does not create a separate human role or authority model.
- PWA chat is the initial interaction boundary.
- The package owns browser resources; the base host publishes them at the origin-root URL paths required for PWA installation.
- The package does not define the server message contract or server-to-browser delivery mechanism.
