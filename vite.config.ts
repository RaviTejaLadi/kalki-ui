import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/playground'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'kalki-ui': 'kalki-ui',
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['kalki-ui'],
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist'),
    emptyOutDir: true,
    sourcemap: true,
    commonjsOptions: {
      include: [/kalki-ui/, /node_modules/],
    },
  },
});