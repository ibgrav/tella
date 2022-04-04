import type { Manifest } from "vite";
import { readFile } from "fs/promises";
import { join } from "path";

export const getStoriesPath = "src/story/stories.ts";
export const storyRenderPath = "src/story/story-render.ts";

export const uiDistRelativePath = "node_modules/tella/dist/ui";
export const uiRenderPath = "src/ui/ui-render.ts";

export async function getUIManifestChunk() {
  const path = join(process.cwd(), uiDistRelativePath, "manifest.json");
  const file = await readFile(path, "utf-8");
  const manifest = JSON.parse(file) as Manifest;

  return manifest[uiRenderPath];
}
