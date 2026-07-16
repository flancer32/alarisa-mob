# Usage Rules

- Keep server transport outside the `mob` package; use the `comm` handler in the host.
- Initialize and register all handlers before `Fl32_Web_Back_Server$` starts, because server startup locks the pipeline.
- Map the package `web/` directory at `/mob/` and preserve relative manifest, worker, and asset URLs.
- Preserve the `202` meaning as acceptance for processing only. Do not render it as an Alarisa reply.
- Do not add persistent browser queues, chat history, credentials, or server-to-browser event transport based on this package alone.
