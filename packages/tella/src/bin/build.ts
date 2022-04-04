import type { Stories, TellaConfig } from "..";
import { join } from "path";
import { rm, writeFile } from "fs/promises";
import { InlineConfig, build as viteBuild, Manifest, createServer } from "vite";
import { document } from "./document.js";

interface BuildResult {
  output: Array<{ fileName: string; source: string }>;
}

export async function build(userConfig: TellaConfig, viteConfig: InlineConfig) {
  const outDir = join(process.cwd(), userConfig.outDir || "dist_tella");

  if (userConfig.clean !== false) {
    try {
      await rm(outDir, { recursive: true, force: true });
    } catch (e) {}
  }

  const inputUI = "tella/src/client/ui/index.ui.ts";
  const inputStory = "tella/src/client/story/index.story.ts";

  const result = (await viteBuild({
    ...viteConfig,
    build: {
      outDir,
      manifest: true,
      minify: userConfig?.minify ?? true,
      rollupOptions: {
        input: {
          ui: `node_modules/${inputUI}`,
          story: `node_modules/${inputStory}`,
        },
      },
    },
  })) as BuildResult;

  const vite = await createServer(viteConfig);
  const stories: Stories = (await vite.ssrLoadModule("tella/src/stories.ts")).stories;
  await vite.close();

  const manifestString = result.output.find(({ fileName }) => fileName === "manifest.json");
  const manifest: Manifest = JSON.parse(manifestString?.source || "{}");

  for await (const [path, item] of Object.entries(manifest)) {
    if (path.endsWith(inputUI)) {
      const index = document({ stories, userConfig, src: item.file, css: item.css });
      await writeFile(join(outDir, "index.html"), index, "utf-8");
    }

    if (path.endsWith(inputStory)) {
      const story = document({ stories, userConfig, src: item.file, css: item.css });
      await writeFile(join(outDir, "story.html"), story, "utf-8");
    }
  }

  await writeFile(join(outDir, "tella.json"), JSON.stringify({ stories, config: userConfig }, null, 2), "utf-8");
}
