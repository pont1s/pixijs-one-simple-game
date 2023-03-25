import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
  publicDir: fileURLToPath(new URL('public', import.meta.url)),
  root: 'src',
  base: '/pixijs-one-simple-game/',
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
    outDir: fileURLToPath(new URL('dist', import.meta.url)),
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('src/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
