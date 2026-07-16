# Browser UI States

- Path: `ctx/docs/code/browser/ui-states.md`
- Changed: `20260716`

## Required Visible States

- `initial` — application bootstrapping has begun.
- `checking session` — public shell asks the server for safe session status.
- `authentication required` — no valid session exists and passkey verification is available.
- `enrollment required` — an administrator enrollment URL can register a passkey.
- `authenticating` — native WebAuthn is active.
- `locked` — Principal content is hidden after explicit lock, session expiry/revocation, or 15 minutes in the background.
- `ready` — chat is available for message input and submission.
- `submitting` — a submitted message is awaiting ingress acknowledgement; retry reuses its stable contribution identifier.
- `accepted` — ingress accepted the Principal contribution for processing; this acknowledgement is not an assistant event.
- `outcome` — a server-provided result is visible to the Principal.
- `error` — the browser cannot complete the requested operation; it preserves a safe retry path without claiming that the message was accepted.
- `offline` — required runtime communication is unavailable; the browser does not silently queue the message for later delivery.

Error and offline states must give the Principal a clear status and a safe next action. The browser must distinguish a pending outcome from a communication failure whenever the future server contract makes that distinction possible.

Static delivery alone never enters `ready`. Valid session status or successful WebAuthn moves to `ready`; explicit or background lock moves to `locked`; server unavailability leaves the application locked.
