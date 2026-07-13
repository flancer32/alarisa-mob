import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import test from 'node:test';

import HumanIngress from '../../../../../src/Back/Handler/HumanIngress.mjs';

const STAGE = {PROCESS: 'PROCESS'};
const dtoInfoFactory = {create: (value) => Object.freeze(value)};

function request({method = 'POST', url = '/api/ingress/human', headers = {'content-type': 'application/json'}, body = ''} = {}) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = headers;
  req.destroy = () => {};
  queueMicrotask(() => { req.emit('data', Buffer.from(body)); req.emit('end'); });
  return req;
}

function response() {
  return {headers: undefined, status: undefined, body: undefined, writeHead(status, headers) { this.status = status; this.headers = headers; }, end(body) { this.body = body; }};
}

test('accepts a valid PWA contribution and delegates it to ingress', async () => {
  const calls = [];
  const handler = new HumanIngress({dtoInfoFactory, STAGE, ingress: {accept: async (input) => calls.push(input)}});
  const context = {request: request({body: JSON.stringify({text: '  Привет  '})}), response: response(), completed: false};

  await handler.handle(context);

  assert.deepEqual(calls, [{text: 'Привет', channel: 'pwa'}]);
  assert.equal(context.response.status, 202);
  assert.deepEqual(JSON.parse(context.response.body), {accepted: true});
  assert.equal(context.completed, true);
});

test('rejects invalid input without calling ingress', async () => {
  let calls = 0;
  const handler = new HumanIngress({dtoInfoFactory, STAGE, ingress: {accept: async () => { calls += 1; }}});
  const context = {request: request({body: JSON.stringify({text: '   '})}), response: response(), completed: false};

  await handler.handle(context);

  assert.equal(calls, 0);
  assert.equal(context.response.status, 400);
  assert.equal(context.completed, true);
});

test('reports unavailable ingress without claiming acceptance', async () => {
  const handler = new HumanIngress({dtoInfoFactory, STAGE, ingress: {accept: async () => { throw new Error('down'); }}});
  const context = {request: request({body: JSON.stringify({text: 'Проверка'})}), response: response(), completed: false};

  await handler.handle(context);

  assert.equal(context.response.status, 503);
  assert.deepEqual(JSON.parse(context.response.body), {accepted: false, error: 'Ingress is unavailable'});
});

test('leaves unrelated routes for another handler', async () => {
  const handler = new HumanIngress({dtoInfoFactory, STAGE, ingress: {accept: async () => assert.fail('must not run')}});
  const context = {request: request({method: 'GET', url: '/'}), response: response(), completed: false};

  await handler.handle(context);

  assert.equal(context.completed, false);
  assert.equal(context.response.status, undefined);
});
