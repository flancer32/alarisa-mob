# Core Abstractions

## Static PWA Source

The host maps the installed package's `web/` directory to `/mob/`. Package resources use relative URLs:

- `./` — PWA entry page;
- `./manifest.webmanifest` — installation metadata;
- `./sw.js` — service worker confined to the mobile scope;
- `./app.js`, `./app.css`, and `./icon.svg` — page resources.

Do not copy these resources into the host or give them root scope.

## Shared Principal Transport

The browser calls the `comm`-owned `POST /api/v1/ingress/human` route with `Content-Type: application/json` and body:

```json
{"contributionId":"stable-id","text":"Principal contribution","channel":"mob"}
```

The browser retains `contributionId` across retry of unchanged text and clears it after `202`.

Responses are:

- `202 {"accepted":true,"contributionId":"…"}` — back ingress durably accepted the contribution;
- `400` — malformed JSON or invalid text;
- `415` — non-JSON request;
- `503` — host ingress could not accept it.

A `202` is an ingress acknowledgement only. It is not an assistant event, a signal identifier, or a promise of an eventual answer.

The `comm` and `back` packages own transport validation and durable acceptance. The mobile package owns only presentation and retry state.
