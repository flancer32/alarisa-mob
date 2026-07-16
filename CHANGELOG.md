# Changelog

## [0.3.0] - 2026-07-16 - Scoped mobile PWA

### Changed

- Made manifest, service-worker, and asset URLs relative to the host-assigned `/mob/` scope.
- Moved Principal contribution transport ownership to `@flancer32/alarisa-comm` at `POST /api/v1/ingress/human`.
- Added stable contribution identifiers across retry.

### Removed

- Removed the package-owned server ingress handler and host-ingress development fixture.

## [0.2.0] - 2026-07-15 - Mobile package identity

### Changed

- Renamed the package from `@flancer32/alarisa-pwa` to `@flancer32/alarisa-mob`.
- Renamed the TeqFW namespace from `Alarisa_Pwa_` to `Alarisa_Mob_`.
- Updated repository, code, tests, agent guidance, browser resources, and cognitive context to the `mob` area identity.

## [0.1.0] - Initial PWA baseline

### Added

- Added the initial mobile-first Alarisa PWA client, ingress transport handler, browser resources, tests, and embedded cognitive context.
