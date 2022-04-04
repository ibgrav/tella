import type { Stories, TellaConfig } from "./define";

declare global {
  interface Window {
    TELLA_CONTEXT: {
      config: TellaConfig;
      stories: Stories;
    };
  }
}

export const config = window.TELLA_CONTEXT.config;
export const stories = window.TELLA_CONTEXT.stories;

export const url = new URL(window.location.href);

export const pathParam = url.searchParams.get("path");
export const storyParam = url.searchParams.get("story");
export const width_param = url.searchParams.get("width");
export const height_param = url.searchParams.get("height");
