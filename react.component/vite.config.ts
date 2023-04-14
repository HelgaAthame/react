/// <reference types="vitest" />
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src'),
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'istanbul',
    }
  },
  optimizeDeps: { include: ['react/jsx-dev-runtime'] },
  build: {
    minify: false,
  },
  envDir: './',
})
