import { defineTellaConfig } from "tella";
import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";

export default defineTellaConfig<ComponentType>({
  base: "/tella/",
  outDir: "./public/tella",
  publicDir: "./public",
  alias: {
    src: "./src",
  },
  render({ root, Story }) {
    createRoot(root).render(<Story />);
  },
});
