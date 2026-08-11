import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const entriesDir = resolve(__dirname, 'src/entries');
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf8'));

function getEntryPoints(): Record<string, string> {
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
    styles: resolve(__dirname, 'src/styles.ts'),
  };

  if (existsSync(entriesDir)) {
    for (const file of readdirSync(entriesDir)) {
      if (!file.endsWith('.ts')) continue;
      const name = file.replace(/\.ts$/, '');
      entries[name] = join(entriesDir, file);
    }
  }

  return entries;
}

const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];

export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      entryRoot: 'src',
      outDir: 'dist',
      insertTypesEntry: true,
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: getEntryPoints(),
      formats: ['es'],
      fileName: (_format, entryName) => {
        if (entryName === 'index' || entryName === 'styles') {
          return `${entryName}.js`;
        }
        return `entries/${entryName}.js`;
      },
    },
    rollupOptions: {
      external,
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'kalki-ui.css';
          }
          return 'assets/[name][extname]';
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    minify: 'esbuild',
    target: 'es2020',
  },
});
