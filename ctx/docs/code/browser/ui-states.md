# Browser UI States

- Path: `ctx/docs/code/browser/ui-states.md`
- Changed: `20260713`

## Required Visible States

- `initial` — application bootstrapping has begun.
- `ready` — chat is available for message input and submission.
- `submitting` — a submitted message is awaiting a server outcome; duplicate submission is prevented or made unambiguous.
- `accepted` — ingress accepted the Principal contribution for processing; this acknowledgement is not an assistant event.
- `outcome` — a server-provided result is visible to the Principal.
- `error` — the browser cannot complete the requested operation; it preserves a safe retry path without claiming that the message was accepted.
- `offline` — required runtime communication is unavailable; the browser does not silently queue the message for later delivery.

Error and offline states must give the Principal a clear status and a safe next action. The browser must distinguish a pending outcome from a communication failure whenever the future server contract makes that distinction possible.
