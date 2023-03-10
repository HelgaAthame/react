/// <reference types="vitest" />
import { defineConfig } from 'vite'
//import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: 'istanbul',
    }
  },
})
