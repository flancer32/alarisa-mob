# Agent Recipes

## Add the PWA to an Alarisa TeqFW Host

Configure the host static handler with the installed package's `web/` directory at `/mob/`.

```js
const staticHandler = await container.get('TeqFw_Web_Back_Handler_Static$');

pipeline.addHandler(staticHandler);
await staticHandler.init({
  sources: [sourceFactory.create({
    root: pwaWebDirectory,
    prefix: '/mob/',
    allow: {'.': ['.']},
    defaults: ['index.html'],
  })],
});
```

Register the `comm` Principal-contribution handler separately before static delivery. This package does not publish a server handler.
