import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const root = realpathSync(fileURLToPath(new URL('.', import.meta.url)));
  const env = loadEnv(mode, root, '');

  return {
    root,
    plugins: [
      react(),
      {
        name: 'dealate-lyzr-assistant',
        configureServer(server) {
          server.middlewares.use('/api/dealate-assistant', async (request, response) => {
            if (request.method !== 'POST') {
              response.statusCode = 405;
              response.end('Method not allowed');
              return;
            }
            const apiKey = env.LYZR_API_KEY;
            const userId = env.LYZR_USER_ID;
            const agentId = env.LYZR_AGENT_ID;
            if (!apiKey || !userId || !agentId) {
              response.statusCode = 503;
              response.setHeader('Content-Type', 'application/json');
              response.end(JSON.stringify({ error: 'Lyzr is not configured yet.' }));
              return;
            }
            let body = '';
            request.on('data', (chunk) => { body += chunk; });
            request.on('end', async () => {
              try {
                const { messages, sessionId } = JSON.parse(body);
                const latestMessage = Array.isArray(messages)
                  ? [...messages].reverse().find(({ from }) => from === 'user')?.text
                  : '';
                if (!latestMessage) throw new Error('No message supplied.');
                const lyzrResponse = await fetch(
                  'https://agent-prod.studio.lyzr.ai/v3/inference/chat/',
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-api-key': apiKey,
                    },
                    body: JSON.stringify({
                      user_id: userId,
                      agent_id: agentId,
                      session_id: String(sessionId || `dealate-web-${Date.now()}`).slice(0, 120),
                      message: String(latestMessage).slice(0, 1200),
                    }),
                  },
                );
                const payload = await lyzrResponse.json();
                const text = [payload?.response, payload?.message, payload?.text]
                  .find((value) => typeof value === 'string' && value.trim())
                  ?.trim();
                response.statusCode = lyzrResponse.ok && text ? 200 : 502;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({
                  text: text || 'I could not prepare a response right now. Please send an enquiry and our team will help.',
                }));
              } catch {
                response.statusCode = 400;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify({ error: 'Unable to process that message.' }));
              }
            });
          });
        },
      },
    ],
    build: { outDir: 'dist', emptyOutDir: true },
  };
});
