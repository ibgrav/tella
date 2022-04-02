import { dset } from "dset";
import dlv from "dlv";

export class StoryInstance {
  constructor(public path: string, public mod: Record<string, any>) {}
}

export const storiesGlob = import.meta.globEager(`root/**/*.stories.tsx`);

export const stories: Record<string, any> = {};

for (const [path, mod] of Object.entries(storiesGlob)) {
  const { title } = (mod.default || {}) as { title?: string };

  if (title) {
    dset(stories, title.split("/"), new StoryInstance(path, mod));
  }
}

export function getStory() {
  const url = new URL(window.location.href);
  const path_param = url.searchParams.get("path");
  const story_param = url.searchParams.get("story");

  const storyInstance: StoryInstance | undefined = path_param && dlv(stories, path_param.split("/"));
  const Story = storyInstance && story_param && storyInstance.mod[story_param];

  return { url, path_param, story_param, storiesGlob, stories, storyInstance, Story };
}
