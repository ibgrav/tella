import { Stories, TellaConfig } from "../index";

declare global {
  interface Window {
    TELLA_CONFIG: TellaConfig;
    TELLA_STORIES: Stories;
  }
}

export async function setWindow() {
  const { config, stories } = await (await fetch("tella.json")).json();
  window.TELLA_CONFIG = config;
  window.TELLA_STORIES = stories;
}
