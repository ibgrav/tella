import { getStory } from "./getStory";
import type { TellaConfig } from "../index";

const configGlob = import.meta.globEager(`root/tella.config.*`);
const config_path = Object.keys(configGlob)[0];
const { render } = configGlob[config_path].default as TellaConfig;

const root = document.getElementById("tella-root")!;

(async () => {
  const { Story } = getStory();

  console.log({ Story, render });

  if (Story) {
    render({ root, Story });
  } else {
    root.innerHTML = `<div>no story found - ${location.href}</div>`;
  }
})();
