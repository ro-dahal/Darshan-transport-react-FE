import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import dns from 'dns';
import { fileURLToPath, URL } from 'node:url';
import { createTeamImageEditorDevPlugin } from './teamImageEditorDevServer';

// Resolve IPv6 vs IPv4 local networking issues
dns.setDefaultResultOrder('verbatim');

// https://vite.dev/config/
export default defineConfig(() => {
  const projectRoot = fileURLToPath(new URL('.', import.meta.url));

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    plugins: [
      tailwindcss(),
      react(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Darshan Transport',
          short_name: 'Darshan',
          description: 'Fast & Reliable Logistics in Nepal',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
      visualizer({
        open: false,
        filename: 'bundle-analysis.html',
        gzipSize: true,
        brotliSize: true,
      }) as import('vite').PluginOption,
      createTeamImageEditorDevPlugin(projectRoot),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            'ui-icons': ['react-icons'],
            'ui-meta': ['react-helmet-async'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target:
            (typeof process !== 'undefined' &&
              process.env &&
              process.env.VITE_PROXY_TARGET) ||
            'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
