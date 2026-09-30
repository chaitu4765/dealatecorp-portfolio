import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: realpathSync(fileURLToPath(new URL('.', import.meta.url))),
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
});
