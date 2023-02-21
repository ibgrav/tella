import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  build: {
    minify: false,
    manifest: false,
    rollupOptions: {
      input: "src/index.ts",
      output: {
        dir: "dist"
      }
    }
  }
});
