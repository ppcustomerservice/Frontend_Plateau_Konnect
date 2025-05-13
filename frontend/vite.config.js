import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  root: path.resolve(__dirname, 'frontend'), // path to your app folder
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    proxy: {
      '/api': {
        target: 'https://plateau-konnect-ktp6.onrender.com', // fixed typo in https
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'), // output build here
    emptyOutDir: true,
  },
})
