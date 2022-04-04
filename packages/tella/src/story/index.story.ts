import { getCurrentStory } from "../stories.js";
import { pathParam, storyParam } from "../lib/params.js";
import { findRender } from "./findRender.js";

const root = document.getElementById("tella-root")!;

(async () => {
  const render = findRender();
  const Story = getCurrentStory(pathParam, storyParam);

  if (Story && typeof render === "function") {
    render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
