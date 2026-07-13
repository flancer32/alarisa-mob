# Core Abstractions

## Static PWA Source

The host maps the installed package's `web/` directory to `/`. This makes the following package-owned resources root-scoped:

- `/` — PWA entry page;
- `/manifest.webmanifest` — installation metadata;
- `/sw.js` — service worker;
- `/app.js`, `/app.css`, and `/icon.svg` — page resources.

Do not copy these resources into the host only to obtain root URLs.

## Human Ingress Handler

`Alarisa_Pwa_Back_Handler_HumanIngress$` handles only `POST /api/ingress/human` with `Content-Type: application/json` and body:

```json
{"text":"Principal contribution"}
```

It trims `text`, accepts 1–4000 characters, then calls:

```js
await ingress.accept({text, channel: 'pwa'});
```

where `ingress` is `Alarisa_Back_Ingress_Human$` supplied by the host.

Responses are:

- `202 {"accepted":true}` — host ingress accepted the contribution;
- `400` — malformed JSON or invalid text;
- `415` — non-JSON request;
- `503` — host ingress could not accept it.

A `202` is an ingress acknowledgement only. It is not an assistant event, a signal identifier, or a promise of an eventual answer.

## Host Ingress Contract

The host must publish `Alarisa_Back_Ingress_Human$` with:

```js
{ accept: async ({text, channel}) => { /* accept or throw */ } }
```

The host owns authentication, authorization, validation beyond the transport limit, creation of a human signal, and all dialogue semantics.
