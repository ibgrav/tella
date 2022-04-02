import type { StoryInstance } from "../index";
import dlv from "dlv";
import { path_param, story_param } from "../lib/params";
import { stories } from "../lib/window";

export const storiesGlob = import.meta.globEager(`root/**/*.stories.tsx`);

export function getStory() {
  const storyInstance = path_param && (dlv(stories, path_param.split("/")) as StoryInstance);

  const storyPath = (storyInstance && Object.keys(storiesGlob).find((path) => path.endsWith(storyInstance.__path))) || "";
  const Story = story_param && storiesGlob[storyPath]?.[story_param];

  return { stories, storyInstance, Story };
}
