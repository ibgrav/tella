import html from "../lib/html";
import { sidebar } from "./sidebar";

import "./index.css";
import { main } from "./main";

(async () => {
  const root = document.getElementById("tella-root")!;

  root.innerHTML = html`${sidebar()}${main()}`;
})();
