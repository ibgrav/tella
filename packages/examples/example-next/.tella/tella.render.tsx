import type { ComponentType } from "react";
import { defineTellaRender } from "tella/dist";
import { createRoot } from "react-dom/client";

import "../src/styles/globals.css";

export default defineTellaRender<ComponentType>(({ root, Story }) => {
  createRoot(root).render(<Story />);
});
