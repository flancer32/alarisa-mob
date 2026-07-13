# Browser UI States

- Path: `ctx/docs/code/browser/ui-states.md`
- Changed: `20260713`

## Required Visible States

- `initial` — application bootstrapping has begun.
- `loading` — a chat outcome is pending.
- `ready` — chat is available for input and outcomes.
- `error` — the browser cannot complete the requested operation.
- `offline` — required runtime communication is unavailable.

Error and offline states must give the Principal a clear status and a safe next action.
