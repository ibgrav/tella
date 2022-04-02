export {};

import "../index.css";

const root = document.getElementById("tella-root")!;

const initialWidth = 1920;
const initialHeight = 1080;

root.innerHTML = `
<nav>
  <h1>Tella Stories</h1>
</nav>
<main>
<div class="main__container main__shadow">
  <header class="main__shadow">header!</header>
  <div class="iframe__container">
    <iframe width="${initialWidth}" height="${initialHeight}px" src="/story.html"></iframe>
  </div>
</div>
</main>
`;
