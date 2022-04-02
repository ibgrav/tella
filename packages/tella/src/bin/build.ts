import { rm, writeFile } from "fs/promises";
import { join } from "path";
import { build as viteBuild, createServer } from "vite";
import { getSharedConfig } from "./config";
import { document } from "./document";
import { getStories } from "./stories";

const root_dir = join(process.cwd(), "node_modules/tella");

export async function build() {
  const { sharedConfig, config } = await getSharedConfig();

  const outDir = join(process.cwd(), config.outDir || "dist_tella");

  try {
    await rm(outDir, { recursive: true, force: true });
  } catch (e) {}

  const base = config.base || "/";

  const result: any = await viteBuild({
    ...sharedConfig,
    base,
    optimizeDeps: {
      exclude: [`${outDir}/index.html`, `${outDir}/story.html`],
    },
    build: {
      outDir,
      manifest: true,
      minify: config?.minify ?? true,
      rollupOptions: {
        input: {
          ui: join(root_dir, "src/ui/render.ui.ts"),
          story: join(root_dir, "src/story/render.story.ts"),
        },
      },
    },
  });

  const vite = await createServer({ ...sharedConfig, server: { middlewareMode: "ssr" } });
  const { stories } = await getStories(vite);
  await vite.close();

  const manifest_raw = result.output.find((output: any) => output.fileName === "manifest.json");
  const manifest = JSON.parse(manifest_raw.source);

  for await (const [path, item] of Object.entries(manifest)) {
    if (path.endsWith("tella/src/ui/render.ui.ts")) {
      const index = document({ command: "build", stories, config, src: (item as any).file, css: (item as any).css });
      await writeFile(join(outDir, "index.html"), index, "utf-8");
    }

    if (path.endsWith("tella/src/story/render.story.ts")) {
      const story = document({ command: "build", stories, config, src: (item as any).file, css: (item as any).css });
      await writeFile(join(outDir, "story.html"), story, "utf-8");
    }
  }

  await writeFile(join(outDir, "tella.json"), JSON.stringify({ stories, config }, null, 2), "utf-8");
}
