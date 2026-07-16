import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

test('PWA entry resources remain relative to the assigned mobile scope', async () => {
  const [html, manifest, app, worker] = await Promise.all([
    readFile('web/index.html', 'utf8'),
    readFile('web/manifest.webmanifest', 'utf8'),
    readFile('web/app.js', 'utf8'),
    readFile('web/sw.js', 'utf8'),
  ]);
  const parsed = JSON.parse(manifest);
  assert.match(html, /href="\.\/manifest\.webmanifest"/);
  assert.equal(parsed.start_url, './');
  assert.equal(parsed.scope, './');
  assert.match(app, /serviceWorker\.register\('\.\/sw\.js', \{scope: '\.\/'\}\)/);
  assert.match(app, /fetch\('\/api\/v1\/ingress\/human'/);
  assert.match(app, /crypto\.randomUUID\(\)/);
  assert.doesNotMatch(worker, /\/desk\//);
  assert.doesNotMatch(worker, /\/api\//);
  assert.doesNotMatch(worker, /\/hooks\//);
});
