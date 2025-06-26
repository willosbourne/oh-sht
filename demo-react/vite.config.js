import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,js}",
    }),
  ],
  resolve: {
    alias: {
      // Add an alias for the components directory
      '@components': resolve(__dirname, '../components'),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    },
    include: [
      '../components/index.js', // Include the web component for pre-bundling
      '../components/oh-sht-button.js'
    ],
  },
});
