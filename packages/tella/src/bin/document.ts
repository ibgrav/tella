import type { Stories, TellaConfig } from "..";

interface DocumentProps {
  src: string;
  css?: string[];
  stories: Stories;
  userConfig: TellaConfig;
}

export function document({ src, css = [], stories, userConfig }: DocumentProps) {
  const { title = "", base } = userConfig;

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
      window.TELLA_CONTEXT = ${JSON.stringify({ stories, config: userConfig })};
    </script>
    <script type="module" src="${base}${src}"></script>
  </body>
</html>`;
}
