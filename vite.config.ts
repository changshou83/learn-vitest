/// <reference types="vitest" />

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  plugins: [
    vuePlugin({
      reactivityTransform: true
    }),
    splitVendorChunkPlugin(),
  ],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src-import')) {
            return 'src-import'
          }
        }
      }
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
  },
})
