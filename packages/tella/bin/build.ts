import { writeFile } from "fs/promises";
import { join } from "path";
import { build as viteBuild } from "vite";
import { getSharedConfig } from "./config";
import { document } from "./document";

export async function build() {
  const { sharedConfig } = await getSharedConfig();

  const out_dir = join(process.cwd(), "dist_tella");

  const result: any = await viteBuild({
    ...sharedConfig,
    build: {
      outDir: out_dir,
      manifest: true,
      rollupOptions: {
        input: {
          entry: join(__dirname, "../../src/entry/entry.tsx"),
          story: join(__dirname, "../../src/story/story.tsx"),
        },
      },
    },
  });

  const manifest_raw = result.output.find((output: any) => output.fileName === "manifest.json");
  const manifest = JSON.parse(manifest_raw.source);

  const entry_manifest = manifest["../tella/src/entry/entry.tsx"];
  const entry = document({ src: entry_manifest.file, css: entry_manifest.css });
  await writeFile(join(out_dir, "index.html"), entry, "utf-8");

  const story_manifest = manifest["../tella/src/story/story.tsx"];
  const story = document({ src: story_manifest.file, css: story_manifest.css });
  await writeFile(join(out_dir, "story.html"), story, "utf-8");
}
