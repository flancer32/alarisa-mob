# Usage Rules

- Resolve `Alarisa_Mob_Back_Handler_HumanIngress$` through TeqFW DI; do not construct it manually in application code.
- Register the handler in `Fl32_Web_Back_PipelineEngine$` before the static handler, while registration is still open.
- Initialize and register all handlers before `Fl32_Web_Back_Server$` starts, because server startup locks the pipeline.
- Map the package `web/` directory at `/`; root paths are required for PWA installation and service-worker scope.
- Implement `Alarisa_Back_Ingress_Human$` in the host. Do not make the PWA handler create a human signal or bypass ingress.
- Preserve the `202` meaning as acceptance for processing only. Do not render it as an Alarisa reply.
- Do not add persistent browser queues, chat history, credentials, or server-to-browser event transport based on this package alone.
