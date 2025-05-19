/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': normalizePath(fileURLToPath(new URL('./src', import.meta.url)))
    }
  },
  test: {
  environment: 'jsdom',
  globals: true,
  setupFiles: 'setupTests.ts'
}
})

function normalizePath(p: string) {
  return p.replace(/\\/g, '/'); // Replace backslashes with forward slashes
}