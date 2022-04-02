interface DocumentProps {
  src: string;
  title?: string;
  css?: string[];
}

export function document({ title, src, css = [] }: DocumentProps) {
  const links = css.map((href) => `<link rel="stylesheet" href="/${href}">`);

  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${title || ""}</title>
      ${links}
    </head>
    <body>
      <div id="tella-root"></div>
      <script type="module" src="/${src}"></script>
    </body>
  </html>`;
}
