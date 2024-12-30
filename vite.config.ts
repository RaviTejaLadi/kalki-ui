import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react(), dts({ include: ["src"], insertTypesEntry: true })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "KALKI UI",
      formats: ["es", "umd"],
      fileName: "kalki-ui",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
    },
  },
});
