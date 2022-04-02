import { getStory } from "./stories";
import { config } from "./config";

const root = document.getElementById("tella-root")!;

(async () => {
  const { Story, path_param, story_param } = getStory();

  if (Story && typeof config?.render === "function") {
    config.render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
