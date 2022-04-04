import { getCurrentStory } from "../stories";
import { pathParam, storyParam } from "../lib/params";
import { findRender } from "./findRender";

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
