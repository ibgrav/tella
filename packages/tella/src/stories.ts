import type { Stories, StoryInstance } from "./index";
import { dset } from "./lib/dset";
import { dlv } from "./lib/dlv";

const storiesGlob = import.meta.globEager(`tella_root/**/*.stories.{js,jsx,ts,tsx,md,mdx}`);

export const stories: Stories = {};

for (const [__path, mod] of Object.entries(storiesGlob)) {
  const { title } = mod.default;
  const __stories = Object.keys(mod).filter((n) => n !== "default");

  dset(stories, title.split("/"), { __config: mod.default, __path, __stories });
}

export function getCurrentStory(pathParam: string | null, storyParam: string | null): unknown {
  const currentStories = pathParam && dlv<StoryInstance>(stories, pathParam.split("/"));

  const storyPath = (currentStories && Object.keys(storiesGlob).find((path) => path.endsWith(currentStories.__path))) || "";

  return storyParam && (storiesGlob[storyPath]?.[storyParam] as unknown);
}
