import { getStory } from "./getStory";
import type { TellaConfig } from "../index";
import { setWindow } from "../lib/window";

const configGlob = import.meta.globEager(`root/tella.config.*`);
const config_path = Object.keys(configGlob)[0];
const { render } = configGlob[config_path].default as TellaConfig;

const root = document.getElementById("tella-root")!;

(async () => {
  await setWindow();

  const { Story } = getStory();

  if (Story && typeof render === "function") {
    render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
