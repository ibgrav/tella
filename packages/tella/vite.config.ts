import { join } from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    minify: false,
    manifest: true,
    rollupOptions: {
      input: join(__dirname, "src/ui/ui-render.ts"),
      output: {
        dir: join(__dirname, "dist", "ui"),
      },
    },
  },
});
