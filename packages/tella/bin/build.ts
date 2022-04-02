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

  for await (const [path, item] of Object.entries(manifest)) {
    if (path.endsWith("tella/src/entry/entry.tsx")) {
      const entry = document({ src: (item as any).file, css: (item as any).css });
      await writeFile(join(out_dir, "index.html"), entry, "utf-8");
    }

    if (path.endsWith("tella/src/story/story.tsx")) {
      const entry = document({ src: (item as any).file, css: (item as any).css });
      await writeFile(join(out_dir, "story.html"), entry, "utf-8");
    }
  }
}
