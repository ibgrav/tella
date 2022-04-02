import { defineTellaConfig } from "tella";
import { FunctionalComponent, render } from "preact";

import "./src/index.css";

export default defineTellaConfig<FunctionalComponent>({
  base: "/stories/",
  outDir: "dist/stories",
  render({ root, Story }) {
    render(<Story />, root);
  },
});
