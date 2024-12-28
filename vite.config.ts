import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/playground'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'ui-essentials-react': 'ui-essentials-react',
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['ui-essentials-react'],
  },
  build: {
    outDir: path.resolve(__dirname, '../../dist'),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/playground/index.html'),
    },
    commonjsOptions: {
      include: [/ui-essentials-react/, /node_modules/],
    },
  },
  server: {
    port: 8000,
    open: true,
  },
});
