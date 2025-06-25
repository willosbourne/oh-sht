import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // If needed, add aliases here
    },
  },
  server: {
    port: 3000, // Match the default port
  },
  build: {
    outDir: 'build', // Output directory
  },
});