# Mobile PWA Package Overview

- Path: `ctx/docs/product/overview.md`
- Changed: `20260716`

## Purpose

This package supplies the PWA client through which the Principal interacts with Alarisa.

## Scope

In scope: browser delivery, installable PWA behavior, and the user-facing chat channel. The first useful browser action is entering and submitting a message to the base Alarisa runtime.

Out of scope: Alarisa runtime orchestration, memory ownership, external-service actions, and product authority decisions. Those remain in the base Alarisa project.

## Invariants

- The package serves a single Principal's private Alarisa instance.
- It does not create a separate human role or authority model.
- PWA chat is the initial interaction boundary.
- The Principal interacts with Alarisa primarily through mobile devices; the UI is built mobile-first.
- The package owns browser resources relative to its host-assigned `/mob/` scope; it does not claim the origin root.
- Shared server/client message contracts belong to `@flancer32/alarisa-comm`; the package does not own server transport or the server-to-browser delivery mechanism.
