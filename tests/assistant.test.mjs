import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { createAssistantHandler } from '../server/dealate-assistant.mjs';

const env = {
  LYZR_API_KEY: 'test-only-key',
  LYZR_USER_ID: 'test-user',
  LYZR_AGENT_ID: 'test-agent',
};
const message = {
  messages: [{ from: 'bot', text: 'Welcome' }, { from: 'user', text: 'Our services' }],
  sessionId: 'test-session-123',
};

async function invoke(handler, body = message, options = {}) {
  const headers = {};
  let result;
  await handler({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    ...options,
  }, {
    statusCode: 200,
    setHeader(key, value) { headers[key.toLowerCase()] = value; },
    end(value) { result = { status: this.statusCode, headers, body: JSON.parse(value) }; },
  });
  return result;
}

test('Vercel parsed bodies send only the latest user text and server credentials', async () => {
  let sent;
  const handler = createAssistantHandler({ env, fetchImpl: async (url, options) => {
    sent = { url, ...options, body: JSON.parse(options.body) };
    return Response.json({ response: '  We build websites.  ', internal: 'not-for-client' });
  } });
  const result = await invoke(handler, { ...message, agent_id: 'untrusted-agent', user_id: 'untrusted-user' });
  assert.equal(sent.url, 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/');
  assert.equal(sent.headers['x-api-key'], env.LYZR_API_KEY);
  assert.deepEqual(sent.body, {
    user_id: env.LYZR_USER_ID, agent_id: env.LYZR_AGENT_ID,
    session_id: message.sessionId, message: 'Our services',
  });
  assert.equal(sent.redirect, 'error');
  assert.ok(sent.signal instanceof AbortSignal);
  assert.equal(result.status, 200);
  assert.equal(result.headers['cache-control'], 'no-store');
  assert.deepEqual(result.body, { text: 'We build websites.' });
});

test('local HTTP streams support the same contract and reject oversized bodies', async (t) => {
  const server = createServer(createAssistantHandler({ env, fetchImpl: async () => Response.json({ response: 'Hello' }) }));
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise((resolve) => { server.closeAllConnections(); server.close(resolve); }));
  const url = `http://127.0.0.1:${server.address().port}/api/dealate-assistant`;
  const result = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message) });
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { text: 'Hello' });
  const oversized = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ padding: 'x'.repeat(33 * 1024) }) });
  assert.equal(oversized.status, 413);
  assert.match((await oversized.json()).error, /too large/);
});

test('invalid requests never call Lyzr', async () => {
  const handler = createAssistantHandler({ env, fetchImpl: () => assert.fail('Invalid request reached Lyzr') });
  assert.equal((await invoke(handler, message, { method: 'GET' })).status, 405);
  assert.equal((await invoke(handler, message, { headers: { 'content-type': 'text/plain' } })).status, 415);
  for (const body of [null, {}, '{broken', { messages: [null] }, { messages: [{ from: 'user', text: 42 }] },
    { messages: [{ from: 'user', text: ' ' }] }, { messages: [{ from: 'user', text: 'x'.repeat(1201) }] },
    { ...message, sessionId: {} }, { ...message, sessionId: '../other-session' }]) {
    assert.equal((await invoke(handler, body)).status, 400);
  }
  assert.equal((await invoke(handler, { padding: 'x'.repeat(33 * 1024) })).status, 413);
});

test('missing configuration is a 503 and does not disclose environment values', async () => {
  for (const key of Object.keys(env)) {
    const handler = createAssistantHandler({ env: { ...env, [key]: '' }, fetchImpl: () => assert.fail('Missing credentials reached Lyzr') });
    const result = await invoke(handler);
    assert.equal(result.status, 503);
    assert.doesNotMatch(JSON.stringify(result.body), /test-only-key|test-user|test-agent/);
  }
});

test('provider errors, malformed output and timeouts stay private and have appropriate status', async () => {
  const cases = [
    [async () => Response.json({ error: env.LYZR_API_KEY }, { status: 401 }), 502],
    [async () => Response.json({ response: '' }), 502],
    [async () => new Response('<html>Provider error</html>'), 502],
    [async () => { throw new Error(env.LYZR_API_KEY); }, 502],
    [async () => { throw new DOMException('provider timed out', 'TimeoutError'); }, 504],
  ];
  for (const [fetchImpl, status] of cases) {
    const result = await invoke(createAssistantHandler({ env, fetchImpl }));
    assert.equal(result.status, status);
    assert.ok(result.body.error);
    assert.doesNotMatch(JSON.stringify(result.body), /test-only-key|Provider error|provider timed out/);
  }
});

test('production entry point loads and uses server runtime configuration', async () => {
  const { default: handler } = await import('../api/dealate-assistant.js');
  const result = await invoke(handler, message, { method: 'GET' });
  assert.equal(result.status, 405);
  assert.equal(result.headers.allow, 'POST');
});
