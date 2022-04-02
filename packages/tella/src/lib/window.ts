import { Stories, TellaConfig } from "../index";

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
