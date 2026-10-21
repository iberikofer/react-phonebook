import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/react-phonebook/',
  resolve: {
    alias: [
      // Only match 'redux/...' so bare 'redux' package is resolved from node_modules
      { find: /^redux\//, replacement: `${path.resolve(__dirname, './src/redux')}/` },
      { find: 'components', replacement: path.resolve(__dirname, './src/components') },
      { find: 'hooks', replacement: path.resolve(__dirname, './src/hooks') },
      { find: 'images', replacement: path.resolve(__dirname, './src/images') },
      { find: 'pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: 'routes', replacement: path.resolve(__dirname, './src/routes') },
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ],
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
