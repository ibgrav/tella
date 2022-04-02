import html from "./html";

export function main() {
  const url = new URL(location.href);
  const width = url.searchParams.get("width");
  const height = url.searchParams.get("height");

  return html`
    <main>
      <div class="main__container main__shadow">
        <header class="main__shadow">header!</header>
        <div class="iframe__container">
          <iframe width="${width || 1920}px" height="${height || 1080}px" src="/story.html${location.search}"></iframe>
        </div>
      </div>
    </main>
  `;
}
