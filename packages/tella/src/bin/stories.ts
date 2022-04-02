import type { Stories } from "../index";
import type { ViteDevServer } from "vite";
import fastGlob from "fast-glob";
import { dset } from "dset";

export async function getStories(vite: ViteDevServer) {
  const glob = await fastGlob(`${process.cwd()}/**/*.stories.tsx`);

  const stories: Stories = {};

  const promises = glob.map(async (glob_path) => {
    const file = await vite.ssrLoadModule(glob_path);

    const __path = glob_path.replace(process.cwd(), "");

    const { title } = file.default;
    const __stories = Object.keys(file).filter((n) => n !== "default");

    dset(stories, title.split("/"), { __config: file.default, __path, __stories });
  });

  await Promise.all(promises);

  return { stories };
}
