import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

test('PWA entry resources point to root-scoped manifest and service worker', async () => {
  const [html, manifest, app] = await Promise.all([
    readFile('web/index.html', 'utf8'),
    readFile('web/manifest.webmanifest', 'utf8'),
    readFile('web/app.js', 'utf8'),
  ]);
  assert.match(html, /href="\/manifest\.webmanifest"/);
  assert.equal(JSON.parse(manifest).start_url, '/');
  assert.match(app, /serviceWorker\.register\('\/sw\.js'\)/);
  assert.match(app, /fetch\('\/api\/ingress\/human'/);
});
