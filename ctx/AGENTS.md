# Cognitive Context

- Path: `ctx/AGENTS.md`
- Template Version: `20260702`
- Changed: `20260713`

## Purpose

This repository branch is the cognitive context for the Alarisa PWA package.

## Bootstrap Marker

- This context follows ADSM conventions.
- Use skill `adsm:ctx` for structure validation, upgrade logic, and methodology rules.

## Level Map

- `agent/` — project-local agent and tool materials.
- `assets/` — non-authoritative context artifacts.
- `docs/` — project-facing documentation and constraints.

## Local Reading Map

- Read `docs/ai-intro.md` for package orientation.
- Read `docs/filesystem.md` for the repository map.
- Read `docs/` before changing package behavior.

## Mounted Topology Rule

When `ctx/` is maintained as a separate repository, treat it as mounted at `./ctx/`. Do not create another nested `ctx/` directory.
