import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// During "npm run dev", any request that starts with /api is forwarded
// to the Spring Boot backend on port 8080. The browser thinks it is
// talking to the same server, so the backend needs no CORS settings.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
