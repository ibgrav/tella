import App from "./App.svelte";

const app = new App({
  target: document.getElementById("tella-root")!,
});

export default app;

// import html from "./html";
// import { sidebar } from "./sidebar";

// import "./index.css";
// import { main } from "./main";

// (async () => {
//   const root = document.getElementById("tella-root")!;

//   root.innerHTML = html`${sidebar()}${main()}`;
// })();
