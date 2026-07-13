import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import path from 'node:path';
import test from 'node:test';

import Container from '@teqfw/di';

function request(body) {
  const req = new EventEmitter();
  req.method = 'POST';
  req.url = '/api/ingress/human';
  req.headers = {'content-type': 'application/json'};
  req.destroy = () => {};
  queueMicrotask(() => { req.emit('data', Buffer.from(body)); req.emit('end'); });
  return req;
}

function response() {
  return {headersSent: false, writableEnded: false, status: undefined, body: undefined, writeHead(status) { this.status = status; this.headersSent = true; }, end(body) { this.body = body; this.writableEnded = true; }};
}

test('TeqFW pipeline delivers the PWA ingress route to host ingress', async () => {
  const container = new Container();
  container.enableTestMode();
  container.addNamespaceRoot('Alarisa_', path.resolve('test/fixtures/alarisa/src'), '.mjs');
  container.addNamespaceRoot('Alarisa_Pwa_', path.resolve('src'), '.mjs');
  container.addNamespaceRoot('Fl32_Web_', path.resolve('node_modules/@flancer32/teq-web/src'), '.mjs');
  container.addNamespaceRoot('TeqFw_Log_', path.resolve('node_modules/@teqfw/log/src'), '.mjs');
  container.addNamespaceRoot('node:', path.resolve('node_modules'), '.mjs');
  const pipeline = await container.get('Fl32_Web_Back_PipelineEngine$');
  const handler = await container.get('Alarisa_Pwa_Back_Handler_HumanIngress$');
  const ingress = await container.get('Alarisa_Back_Ingress_Human$');
  pipeline.addHandler(handler);
  pipeline.lockHandlers();

  const res = response();
  await pipeline.onEventRequest(request(JSON.stringify({text: 'Из PWA'})), res);

  assert.equal(res.status, 202);
  assert.deepEqual(JSON.parse(res.body), {accepted: true});
  assert.deepEqual(ingress.calls, [{text: 'Из PWA', channel: 'pwa'}]);
});
