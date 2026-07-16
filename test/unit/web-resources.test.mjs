import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

test('PWA entry resources remain relative to the assigned mobile scope', async () => {
  const [html, manifest, app, styles, worker] = await Promise.all([
    readFile('web/index.html', 'utf8'),
    readFile('web/manifest.webmanifest', 'utf8'),
    readFile('web/app.js', 'utf8'),
    readFile('web/app.css', 'utf8'),
    readFile('web/sw.js', 'utf8'),
  ]);
  const parsed = JSON.parse(manifest);
  assert.match(html, /href="\.\/manifest\.webmanifest"/);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /id="signal-status"/);
  assert.doesNotMatch(`${html}\n${app}`, /[\u0400-\u04FF]/);
  assert.match(app, /querySelector\('#signal-status'\)/);
  assert.doesNotMatch(app, /querySelector\('\.status'\)/);
  assert.match(styles, /\[hidden\]\s*\{\s*display:\s*none\s*!important;/);
  assert.equal(parsed.start_url, './');
  assert.equal(parsed.scope, './');
  assert.match(app, /serviceWorker\.register\('\.\/sw\.js', \{scope: '\.\/'\}\)/);
  assert.match(worker, /alarisa-mob-v4/);
  assert.match(worker, /caches\.delete/);
  assert.match(app, /fetch\('\/api\/v1\/ingress\/human'/);
  assert.match(app, /crypto\.randomUUID\(\)/);
  assert.doesNotMatch(worker, /\/desk\//);
  assert.doesNotMatch(worker, /\/api\//);
  assert.doesNotMatch(worker, /\/hooks\//);
});
