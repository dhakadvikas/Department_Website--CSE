import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteImagemin from 'vite-plugin-imagemin';

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
