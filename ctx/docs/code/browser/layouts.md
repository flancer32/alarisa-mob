# Browser Layouts

- Path: `ctx/docs/code/browser/layouts.md`
- Changed: `20260713`

## Layout Model

The initial chat page needs an avatar region (Alarisa portrait), an outcome region, a message-composition region, and a visible application-status region. The outcome region may display a returned server outcome or the status of an in-progress submission; it is not specified as a persistent local transcript.

## Visual Hierarchy

1. Avatar (Alarisa portrait, centred on mobile, left-aligned ≥600px)
2. Header ("Личный канал" / "Alarisa" title)
3. Status bar (app-level connection/ready/error state)
4. Outcome region (server response or error)
5. Message-composition form (textarea + submit button)
