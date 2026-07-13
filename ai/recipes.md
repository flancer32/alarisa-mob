# Agent Recipes

## Add the PWA to an Alarisa TeqFW Host

Resolve the PWA handler and register it before the host static handler. Configure the static handler with the installed package's `web/` directory as a root source at `/`.

```js
const humanIngressHandler = await container.get('Alarisa_Pwa_Back_Handler_HumanIngress$');
const staticHandler = await container.get('Fl32_Web_Back_Handler_Static$');

pipeline.addHandler(humanIngressHandler);
pipeline.addHandler(staticHandler);
await staticHandler.init({
  sources: [sourceFactory.create({
    root: pwaWebDirectory,
    prefix: '/',
    allow: {'.': ['.']},
    defaults: ['index.html'],
  })],
});
```

Before resolving the PWA handler, make `Alarisa_Back_Ingress_Human$` available in the host namespace. Its `accept` operation must accept `{text, channel: 'pwa'}` or throw when ingress cannot accept the contribution.

This recipe deliberately does not define authentication, signal persistence, or assistant-event delivery; those are host runtime concerns.
