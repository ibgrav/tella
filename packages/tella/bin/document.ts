import { TellaConfig } from "../index";

interface DocumentProps {
  src: string;
  css?: string[];
  tellaConfig: TellaConfig;
}

export function document({ src, css = [], tellaConfig }: DocumentProps) {
  const { title = "" } = tellaConfig;
  const links = css.map((href) => `<link rel="stylesheet" href="${href}">`);

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
      ${links}
    </head>
    <body>
      <div id="tella-root"></div>
      <script type="module" src="${src}"></script>
    </body>
  </html>`;
}
