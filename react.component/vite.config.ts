/// <reference types="vitest" />
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: {
    host: true,
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
