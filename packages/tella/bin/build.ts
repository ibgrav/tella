import { writeFile } from "fs/promises";
import { join } from "path";
import { build as viteBuild } from "vite";
import { getSharedConfig } from "./config";
import { document } from "./document";

export async function build() {
  const { sharedConfig, tellaConfig } = await getSharedConfig();

  const out_dir = join(process.cwd(), "dist_tella");

  const result: any = await viteBuild({
    ...sharedConfig,
    build: {
      minify: false,
      outDir: out_dir,
      manifest: true,
      rollupOptions: {
        input: {
          index: join(__dirname, "../src/index.ts"),
          story: join(__dirname, "../src/story.ts"),
        },
      },
    },
  });

  const manifest_raw = result.output.find((output: any) => output.fileName === "manifest.json");
  const manifest = JSON.parse(manifest_raw.source);

  for await (const [path, item] of Object.entries(manifest)) {
    if (path.endsWith("tella/src/index.ts")) {
      const index = document({ tellaConfig, src: (item as any).file, css: (item as any).css });
      await writeFile(join(out_dir, "index.html"), index, "utf-8");
    }

    if (path.endsWith("tella/src/story.ts")) {
      const story = document({ tellaConfig, src: (item as any).file, css: (item as any).css });
      await writeFile(join(out_dir, "story.html"), story, "utf-8");
    }
  }
}
