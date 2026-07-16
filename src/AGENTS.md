# Source Modules

- Path: `src/AGENTS.md`
- Changed: `20260716`

## Purpose

Reserves the `Alarisa_Mob_` namespace for future mobile browser modules. The current application is delivered from `web/`.

## Boundary

Server transport and trusted processing must remain outside this package. Shared communication belongs to `@flancer32/alarisa-comm` and server authority belongs to `back` or the host composition root.
