import type { Stories, TellaConfig } from "..";

declare global {
  interface Window {
    TELLA_CONTEXT: {
      config: TellaConfig;
      stories: Stories;
      renderFilePath: string;
    };
  }
}

export const config = window.TELLA_CONTEXT.config;
export const stories = window.TELLA_CONTEXT.stories;
export const renderFilePath = window.TELLA_CONTEXT.renderFilePath;

export const url = new URL(window.location.href);

export const pathParam = url.searchParams.get("path");
export const storyParam = url.searchParams.get("story");
export const width_param = url.searchParams.get("width");
export const height_param = url.searchParams.get("height");
