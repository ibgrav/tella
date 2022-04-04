import type { ComponentType } from 'react';
import { createRoot } from "react-dom/client";
import { defineTellaRender } from "tella";

export default defineTellaRender<ComponentType>(({ root, Story }) => {
  createRoot(root).render(<Story />);
});  
  