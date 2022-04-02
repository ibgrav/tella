import { Stories, TellaConfig } from "../index";

interface DocumentProps {
  command?: "dev" | "build";
  src: string;
  css?: string[];
  config: TellaConfig;
  stories: Stories;
}

export function document({ command, src, stories, css = [], config }: DocumentProps) {
  config.base = command === "build" ? config.base : "";

  const { title = "", base } = config;

  const links = css.map((href) => `<link rel="stylesheet" href="${base}${href}">`);

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links}
    </head>
    <body>
      <div id="tella-root"></div>
      <script>
        window.TELLA_CONTEXT = ${JSON.stringify({ stories, config })};
      </script>
      <script type="module" src="${base}${src}"></script>
    </body>
  </html>`;
}
