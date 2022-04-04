import html from "../lib/html.js";
import { sidebar } from "./sidebar.js";

import "./index.css";
import { main } from "./main";

(async () => {
  const root = document.getElementById("tella-root")!;

  root.innerHTML = html`${sidebar()}${main()}`;
})();
