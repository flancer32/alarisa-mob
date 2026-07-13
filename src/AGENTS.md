# Source Modules

- Path: `src/AGENTS.md`
- Changed: `20260713`

## Purpose

Contains TeqFW modules in the `Alarisa_Pwa_` namespace.

## Boundary

The human-ingress handler only validates HTTP transport and delegates accepted content to the host runtime. It must not create signals, authenticate the Principal, or implement dialogue semantics.
