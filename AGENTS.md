# Root Level

- Path: `AGENTS.md`
- Template Version: `20260702`
- Changed: `20260715`

## Purpose

Root-level working rules for the `@flancer32/alarisa-mob` package repository.

## Repository Topology

This is a one-repository ADSM project. Product files and the embedded cognitive context under `ctx/` are versioned together.

The cognitive context is authoritative. Read `ctx/AGENTS.md` and `ctx/docs/` before changing package meaning or browser behavior.

## Level Boundary

Defines the boundary between the mobile PWA implementation and its embedded cognitive context. Product meaning belongs under `ctx/docs/`; source and browser resources belong outside `ctx/`.

## Root File Protection

Do not modify this file, `.gitignore`, or `README.md` unless explicitly instructed by the human.
