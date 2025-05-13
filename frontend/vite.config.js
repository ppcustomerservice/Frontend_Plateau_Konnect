import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: '.', // if vite.config.js is inside 'frontend'
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    proxy: {
      '/api': {
        target: 'https://plateau-konnect-ktp6.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: 'index.html',
    },
    outDir: 'dist',
  },
})
