import type { Stories, StoryInstance } from "../index";
import html from "../lib/html";
import { path_param, story_param } from "../lib/params";

export function sidebar() {
  const stories = window.TELLA_STORIES;

  return html`<nav>
    <h1>Tella Stories</h1>
    ${sidebarItem(stories, "")}
  </nav>`;
}

function sidebarItem(item: Stories | StoryInstance, path: string): string {
  const parent = !Boolean(path);

  if (item.__config) {
    const links = (item.__stories as string[]).map((name) => {
      const active = path_param?.startsWith(path) && name === story_param;
      return html`<a class="${active ? "active" : ""}" href="?path=${path}&story=${name}">${name}</a>`;
    });
    return links.join("");
  }

  const details = Object.entries(item).map(([key, val]) => {
    const path_new = path ? `${path}/${key}` : key;
    const active = path_param && path_param?.startsWith(path_new);

    return html`
      <details class="${parent ? "parent" : ""}" ${active ? "open" : ""}>
        <summary>${key}</summary>
        ${sidebarItem(val, path_new)}
      </details>
    `;
  });
  return details.join("");
}