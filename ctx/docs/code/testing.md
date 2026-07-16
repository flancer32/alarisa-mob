# Testing

- Path: `ctx/docs/code/testing.md`
- Changed: `20260716`

## Test Boundary

Unit tests belong under `test/unit/` and run through `npm test`. They verify relative manifest and service-worker scope, absence of API/hook paths from the worker cache, the shared versioned API route, and stable contribution identifiers. Transport-handler tests belong to `@flancer32/alarisa-comm`, not this package. The exact browser automation and offline tests remain unspecified.
