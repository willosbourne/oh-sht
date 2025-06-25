import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Include .js files as JSX
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
    port: 3000, // Match the default CRA port
  },
  build: {
    outDir: 'build', // Match the default CRA output directory
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
