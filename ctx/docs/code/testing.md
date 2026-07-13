# Testing

- Path: `ctx/docs/code/testing.md`
- Changed: `20260713`

## Test Boundary

Unit tests belong under `test/unit/` and run through `npm test`. They cover ingress-route method and payload validation, delegation only after valid input, unavailable ingress handling, and PWA resource references. Browser verification must cover root delivery of the manifest and service worker, installability, message submission, and visible unavailable/error states. The exact browser test tooling and offline tests are not yet specified.
