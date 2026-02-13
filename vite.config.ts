import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Declare Node's process to satisfy TypeScript without @types/node
declare const process: { env?: Record<string, string | undefined> };

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: (typeof process !== 'undefined' && process.env && process.env.VITE_PROXY_TARGET) || 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
