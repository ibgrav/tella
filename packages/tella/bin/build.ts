import { writeFile } from "fs/promises";
import { join } from "path";
import { build as viteBuild } from "vite";
import { getSharedConfig } from "./config";
import { document } from "./document";

export async function build() {
  const { sharedConfig, tellaConfig } = await getSharedConfig();

  console.log(tellaConfig);

  const outDir = join(process.cwd(), tellaConfig.outDir || "dist_tella");

  const result: any = await viteBuild({
    ...sharedConfig,
    build: {
      outDir,
      manifest: true,
      minify: tellaConfig?.minify ?? true,
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
      await writeFile(join(outDir, "index.html"), index, "utf-8");
    }

    if (path.endsWith("tella/src/story.ts")) {
      const story = document({ tellaConfig, src: (item as any).file, css: (item as any).css });
      await writeFile(join(outDir, "story.html"), story, "utf-8");
    }
  }
}
