import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx', // Add this
    include: /src\/.*\.jsx?$/, // Process .js and .jsx files
  },
  build: {
    rollupOptions: {
      input: './public/index.html', // Path to your index.html
    },
    outDir: '../server/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      'picocss': path.resolve(__dirname, '../node_modules/@picocss/pico/css')
    }
  },
  
  server: {
    proxy: {
      '/api/events': {
        target: 'http://localhost:3003'
      },
      'events': {
        target: 'http://localhost:3003'
      }
    }
  }
})