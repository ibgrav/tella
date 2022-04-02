import { defineTellaRender } from "tella";

import "./src/index.css";

export default defineTellaRender(({ root, Story }) => {
  root.innerHTML = "hello world";
});
