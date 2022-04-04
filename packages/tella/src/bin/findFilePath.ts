import { join } from "path";
import { access } from "fs/promises";

export async function findFilePath(name: string) {
  const folders = ["", ".tella", "src", ".storybook"];
  const exts = ["ts", "tsx", "js", "jsx", "mjs"];

  for await (const folder of folders) {
    for await (const ext of exts) {
      try {
        const path = join(process.cwd(), folder, `${name}.${ext}`);
        await access(path);
        return path;
      } catch (e) {}
    }
  }

  throw new Error(`${name}.{${exts.join(",")}} not found\n`);
}
