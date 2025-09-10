import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//OPCIONAL
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['regalo-sussy.onrender.com'],
    host: '0.0.0.0'
  },
  preview: {
    allowedHosts: ['regalo-sussy.onrender.com'],
    host: '0.0.0.0'
  }
})