import type { Stories, TellaConfig } from "../define";

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
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
