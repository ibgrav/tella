import html from "./html";
import { sidebar } from "./sidebar";

import "./index.css";
import { main } from "./main";

const root = document.getElementById("tella-root")!;

root.innerHTML = html`${sidebar()}${main()}`;
