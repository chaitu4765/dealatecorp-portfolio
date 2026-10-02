import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createAssistantHandler } from './server/dealate-assistant.mjs';

export default defineConfig(({ mode }) => {
  const root = realpathSync(fileURLToPath(new URL('.', import.meta.url)));
  const env = loadEnv(mode, root, '');
  const assistant = createAssistantHandler({ env });

  return {
    root,
    plugins: [
      react(),
      {
        name: 'dealate-lyzr-assistant',
        configureServer(server) {
          server.middlewares.use('/api/dealate-assistant', assistant);
        },
        configurePreviewServer(server) {
          server.middlewares.use('/api/dealate-assistant', assistant);
        },
      },
    ],
    build: { outDir: 'dist', emptyOutDir: true },
  };
});
