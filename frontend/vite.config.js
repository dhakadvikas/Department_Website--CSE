import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteImagemin from 'vite-plugin-imagemin';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteImagemin({
      // Updated settings for better compatibility and performance
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 50 },
      pngquant: { quality: [0.65, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false },
        ],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '180.png', 'masked-icon.svg'],
      manifest: {
        name: 'CSE Department UIT-RGPV',
        short_name: 'CSE Dept',
        description: 'Department of Computer Science & Engineering at UIT-RGPV',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5174,
    // Explicit HMR configuration to resolve WebSocket issues
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173, // Explicitly set the HMR port
    },
  },
  build: {
    // Ensure compatibility with modern browsers
    target: 'esnext',
  },
});
