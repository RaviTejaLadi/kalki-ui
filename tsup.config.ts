import { defineConfig } from 'tsup';
import esbuildPluginAliasPath from 'esbuild-plugin-alias-path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [
    esbuildPluginAliasPath({
      alias: {
        '@': './src'
      }
    })
  ]
});
