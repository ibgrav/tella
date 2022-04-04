import { getCurrentStory } from "../stories";
import { pathParam, storyParam } from "../lib/params";
import type { TellaRenderFunction } from "..";

const root = document.getElementById("tella-root")!;

const renderGlob = import.meta.globEager(`tella_root/tella.render.*`);
const [, mod] = Object.entries(renderGlob)[0];
const render = mod?.default as TellaRenderFunction;

(async () => {
  const Story = getCurrentStory(pathParam, storyParam);

  if (Story && typeof render === "function") {
    render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
