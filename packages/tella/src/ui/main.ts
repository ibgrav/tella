import html from "../lib/html.js";
import { config, width_param, height_param } from "../lib/params";

export function main() {
  const { base } = config;

  return html`
    <main>
      <div class="main__container main__shadow">
        <header class="main__shadow">header!</header>
        <div class="iframe__container">
          <iframe
            width="${width_param || 1920}px"
            height="${height_param || 1080}px"
            src="${base}story.html${location.search}"
          ></iframe>
        </div>
      </div>
    </main>
  `;
}
