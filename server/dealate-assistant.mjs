import { randomUUID } from 'node:crypto';

const MAX_BODY_BYTES = 32 * 1024;
const MAX_MESSAGE_LENGTH = 1200;
const LYZR_ENDPOINT = 'https://agent-prod.studio.lyzr.ai/v3/inference/chat/';

function reply(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(payload));
}

async function readBody(request) {
  // Vercel supplies a parsed body; Vite supplies the raw Node request stream.
  if (request.body !== undefined) {
    const raw = typeof request.body === 'string' || Buffer.isBuffer(request.body)
      ? request.body.toString()
      : JSON.stringify(request.body);
    if (Buffer.byteLength(raw) > MAX_BODY_BYTES) throw new RangeError();
    return JSON.parse(raw);
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request.iterator({ destroyOnReturn: false })) {
    size += Buffer.byteLength(chunk);
    if (size > MAX_BODY_BYTES) {
      request.resume();
      throw new RangeError();
    }
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createAssistantHandler({ env = process.env, fetchImpl = fetch } = {}) {
  return async function dealateAssistant(request, response) {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return reply(response, 405, { error: 'Method not allowed.' });
    }
    const contentType = request.headers['content-type']?.split(';')[0].trim().toLowerCase();
    if (contentType !== 'application/json') {
      return reply(response, 415, { error: 'Send the message as JSON.' });
    }

    let body;
    try {
      body = await readBody(request);
    } catch (error) {
      return reply(response, error instanceof RangeError ? 413 : 400, {
        error: error instanceof RangeError ? 'Message body is too large.' : 'Invalid message body.',
      });
    }
    const latestMessage = Array.isArray(body?.messages)
      ? body.messages.findLast((message) => message?.from === 'user')?.text
      : undefined;
    if (typeof latestMessage !== 'string' || !latestMessage.trim()
      || latestMessage.length > MAX_MESSAGE_LENGTH) {
      return reply(response, 400, { error: 'Enter a message between 1 and 1200 characters.' });
    }
    if (body.sessionId !== undefined && (typeof body.sessionId !== 'string'
      || !/^[a-zA-Z0-9_-]{1,120}$/.test(body.sessionId))) {
      return reply(response, 400, { error: 'Invalid chat session.' });
    }

    const apiKey = env.LYZR_API_KEY?.trim();
    const userId = env.LYZR_USER_ID?.trim();
    const agentId = env.LYZR_AGENT_ID?.trim();
    if (!apiKey || !userId || !agentId) {
      return reply(response, 503, { error: 'Dealate Assistant is temporarily unavailable.' });
    }

    try {
      const upstream = await fetchImpl(LYZR_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({
          user_id: userId,
          agent_id: agentId,
          session_id: body.sessionId || `dealate-web-${randomUUID()}`,
          message: latestMessage.trim(),
        }),
        signal: AbortSignal.timeout(45_000),
        redirect: 'error',
      });
      if (!upstream.ok) {
        return reply(response, 502, { error: 'Dealate Assistant could not respond. Please try again.' });
      }
      const payload = await upstream.json();
      const text = [payload?.response, payload?.message, payload?.text]
        .find((value) => typeof value === 'string' && value.trim())?.trim();
      if (!text) {
        return reply(response, 502, { error: 'Dealate Assistant returned an empty response. Please try again.' });
      }
      return reply(response, 200, { text });
    } catch (error) {
      const timedOut = error?.name === 'TimeoutError' || error?.name === 'AbortError';
      return reply(response, timedOut ? 504 : 502, {
        error: timedOut ? 'The reply took too long. Please try again.' : 'Dealate Assistant could not connect. Please try again.',
      });
    }
  };
}
