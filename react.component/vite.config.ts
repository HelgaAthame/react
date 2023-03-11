/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    port: 5000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'istanbul',
    }
  },
})
