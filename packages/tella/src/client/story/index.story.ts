// import { getCurrentStory } from "../../stories.js";
import { pathParam, storyParam } from "../params.js";
import { findRender } from "./findRender.js";

const root = document.getElementById("tella-root")!;

const getCurrentStory = (pathParam: string | null, storyParam: string | null) => {
  return () => [pathParam, storyParam, "story!"].join(" ");
};

(async () => {
  const render = findRender();
  const Story = getCurrentStory(pathParam, storyParam);
  //@ts-ignore
  if (Story && typeof render === "function") {
    render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
