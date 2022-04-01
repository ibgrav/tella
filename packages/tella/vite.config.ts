import { join } from "path";
import { defineConfig } from "vite";

const IS_SSR = process.env.TELLA_SSR === "true";

const input: Record<string, string> = {};

if (IS_SSR) input.index = join(__dirname, "src", "index.ts");
else {
  input.entry = join(__dirname, "src", "entry.ts");
  input.frame = join(__dirname, "src", "entry.ts");
}

export default defineConfig({
  build: {
    manifest: !IS_SSR,
    ssr: IS_SSR,
    outDir: join(process.cwd(), "dist", IS_SSR ? "server" : "client"),
    rollupOptions: {
      input,
    },
  },
});
