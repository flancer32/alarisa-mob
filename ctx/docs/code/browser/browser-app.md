# Browser Application Overview

- Path: `ctx/docs/code/browser/browser-app.md`
- Changed: `20260713`

## Purpose

Describe the Alarisa PWA client package.

## Delivery Model

The package will deliver an installable PWA browser client. Its exact framework, routing model, manifest, service worker, and API contract are undecided.

## Entry Points

The initial browser entry is the Principal's Alarisa chat experience.

## Accessibility Baseline

User-visible controls, status, errors, and chat interaction must remain operable with keyboard and assistive technology.

## Bootstrapping And Initialization

Initialization must expose loading and unavailable outcomes rather than assuming that the base runtime is reachable.
