import type { Stories, TellaConfig } from "../define";
import { join } from "path";
import { copyFile, rm, writeFile } from "fs/promises";
import { InlineConfig, build as viteBuild, Manifest, createServer } from "vite";
import { document } from "./document.js";
import { getUIManifestChunk, storyRenderPath, getStoriesPath, uiDistRelativePath } from "./manifest.js";

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

  const storyFilePath = `node_modules/tella/${storyRenderPath}`;

  const result = (await viteBuild({
    ...viteConfig,
    build: {
      outDir,
      manifest: true,
      minify: userConfig?.minify ?? true,
      rollupOptions: {
        input: {
          story: storyFilePath,
        },
      },
    },
  })) as BuildResult;

  const vite = await createServer(viteConfig);
  const stories: Stories = (await vite.ssrLoadModule(`tella/${getStoriesPath}`)).stories;
  await vite.close();

  const uiChunk = await getUIManifestChunk();
  const index = document({ stories, userConfig, src: uiChunk.file, css: uiChunk.css });
  await writeFile(join(outDir, "index.html"), index, "utf-8");

  const uiChunkFilePath = join(uiDistRelativePath, uiChunk.file);
  await copyFile(uiChunkFilePath, join(outDir, uiChunk.file));

  for await (const css of uiChunk.css || []) {
    const cssDistPath = join(uiDistRelativePath, css);
    await copyFile(cssDistPath, join(outDir, css));
  }

  const storyManifestString = result.output.find(({ fileName }) => fileName === "manifest.json");
  const storyManifest: Manifest = JSON.parse(storyManifestString?.source || "{}");
  const storyChunk = storyManifest[storyFilePath];

  const story = document({ stories, userConfig, src: storyChunk.file, css: storyChunk.css });
  await writeFile(join(outDir, "story.html"), story, "utf-8");

  await writeFile(join(outDir, "tella.json"), JSON.stringify({ stories, config: userConfig }, null, 2), "utf-8");
}
