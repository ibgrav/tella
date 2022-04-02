import html from "./html";
import { StoryInstance, stories, getStory } from "./stories";

export function sidebar() {
  return html`<nav>
    <h1>Tella Stories</h1>
    ${sidebarItem(stories, "")}
  </nav>`;
}

function sidebarItem(item: unknown, path: string): string {
  const { path_param, story_param } = getStory();

  const parent = !Boolean(path);

  if (item instanceof StoryInstance) {
    const links = Object.keys(item.mod).map((name) => {
      if (name !== "default") {
        const active = path_param?.startsWith(path) && name === story_param;

        return html`<a class="${active ? "active" : ""}" href="?path=${path}&story=${name}">${name}</a>`;
      }
    });
    return links.join("");
  }

  if (item && typeof item === "object") {
    const details = Object.entries(item).map(([key, val]) => {
      const path_new = path ? `${path}/${key}` : key;
      const active = path_param && path_param?.startsWith(path_new);

      console.log({ active, path_param, path_new });

      return html`
        <details class="${parent ? "parent" : ""}" ${active ? "open" : ""}>
          <summary>${key}</summary>
          ${sidebarItem(val, path_new)}
        </details>
      `;
    });
    return details.join("");
  }

  return "";
}
