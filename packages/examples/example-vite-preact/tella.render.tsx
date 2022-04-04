import { defineTellaRender } from "tella";
import { FunctionalComponent, render } from "preact";

import "./src/index.css";

export default defineTellaRender<FunctionalComponent>(({ Story, root }) => {
  render(<Story />, root);
});
