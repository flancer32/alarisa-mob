# AGENTS.md

Version: 20260713

## Package Purpose

This directory is the agent interface for `@flancer32/alarisa-mob`. It is a concise usage guide for AI agents that consume this package from an Alarisa TeqFW host.

It describes integration points and supported behavior. It does not describe package development, its repository layout, or test procedures.

## Reading Order

1. `overview.md` — package role and supported entry points.
2. `abstractions.md` — browser resources, handler, and host ingress contract.
3. `rules.md` — integration constraints.
4. `recipes.md` — canonical host wiring.

## Scope

Treat behavior absent from these documents as undefined. Do not infer browser persistence, authentication, dialogue delivery, or additional endpoints from package internals.
