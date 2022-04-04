import type { Stories, StoryInstance } from "../define";
import { dset } from "../lib/dset.js";
import { dlv } from "../lib/dlv.js";

const storiesGlob = import.meta.globEager(`tella_root/**/*.stories.{js,jsx,ts,tsx,md,mdx}`);

export const stories: Stories = {};

for (const [__path, mod] of Object.entries(storiesGlob)) {
  const { title } = mod.default;

  const __stories = Object.keys(mod).filter((n) => n !== "default");

  dset(stories, title.split("/"), { __config: mod.default, __path, __stories });
}

export function getCurrentStory(pathParam: string | null, storyParam: string | null): unknown {
  if (pathParam && storyParam) {
    const currentStories = dlv<StoryInstance>(stories, pathParam.split("/"));

    if (currentStories) {
      const storyPath = Object.keys(storiesGlob).find((path) => path.endsWith(currentStories.__path));

      if (storyPath) {
        return storiesGlob[storyPath]?.[storyParam] as unknown;
      }
    }
  }
}
