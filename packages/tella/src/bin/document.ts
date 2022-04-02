import { Stories, TellaConfig } from "../index";

interface DocumentProps {
  command?: "dev" | "build";
  src: string;
  css?: string[];
  tellaConfig: TellaConfig;
}

export function document({ command, src, css = [], tellaConfig }: DocumentProps) {
  tellaConfig.base = command === "build" ? tellaConfig.base : "";

  const { title = "", base } = tellaConfig;

  const links = css.map((href) => `<link rel="stylesheet" href="${base}${href}">`);

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links}
    </head>
    <body>
      <div id="tella-root"></div>
      <script type="module" src="${base}${src}"></script>
    </body>
  </html>`;
}
