import { getCurrentStory } from "./stories";
import { pathParam, storyParam } from "../params";
import { findRender } from "./find-render";

const root = document.getElementById("tella-root")!;

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
