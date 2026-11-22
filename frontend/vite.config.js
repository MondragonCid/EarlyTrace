import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Send every /api request to the Spring Boot backend on port 8080
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})