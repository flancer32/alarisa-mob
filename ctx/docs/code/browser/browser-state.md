# Browser State

- Path: `ctx/docs/code/browser/browser-state.md`
- Changed: `20260716`

## State Boundary

The browser needs transient message-composition state, one in-progress submission state, and visible runtime availability state. These states exist to make the message submission flow understandable; they are not a browser-owned chat history or product memory.

## Ownership And Lifecycle

- Draft text, pending contribution identifier, and submission state are in-memory and clear when the page is reloaded unless a later approved design says otherwise.
- Retry of unchanged text reuses the pending contribution identifier; changing the text creates a new identifier, and `202` clears it.
- Visible availability and error state is derived from browser/runtime communication and clears or changes when the communication attempt is retried.
- Installation and service-worker state is browser-managed; the PWA may present its effects but does not own a separate product record of installation.

Persistent browser storage, session restoration, credential storage, chat-history caching, and offline message queues are intentionally unspecified.
