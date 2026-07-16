# Browser State

- Path: `ctx/docs/code/browser/browser-state.md`
- Changed: `20260716`

## State Boundary

The browser needs transient message-composition state, one in-progress submission state, and visible runtime availability state. These states exist to make the message submission flow understandable; they are not a browser-owned chat history or product memory.

## Ownership And Lifecycle

- Draft text, pending message identifier, and submission state are in-memory and clear when the page is reloaded unless a later approved design says otherwise.
- Retry of unchanged text reuses the pending message identifier; changing the text creates a new identifier, and `202` clears it.
- Visible availability and error state is derived from browser/runtime communication and clears or changes when the communication attempt is retried.
- Installation and service-worker state is browser-managed; the PWA may present its effects but does not own a separate product record of installation.
- Session status is derived from the server; the opaque cookie is `HttpOnly` and absent from browser state.
- The enrollment capability is read from the administrator URL only until successful registration, then removed from the visible URL with history replacement.
- Background time is held only in memory; after 15 minutes continuously hidden, logout clears visible Principal state.

The server session is restored through its cookie, not JavaScript storage. Persistent Principal-data storage, credential storage, chat-history caching, encrypted offline state, and offline message queues remain absent. The service worker caches only public application and shared communication assets.
