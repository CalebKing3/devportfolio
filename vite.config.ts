import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Changed from '/kingcaleb.com/' to fix route issues
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
