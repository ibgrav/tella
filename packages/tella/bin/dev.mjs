#!/usr/bin/env node
//@ts-check
import { join } from "path";
import { Server } from "http";
import { createServer } from "vite";

const [, , command] = process.argv;
const port = parseInt(process.env.PORT || "6001");

// if (command === "dev") {
dev();
// }

async function dev() {
  const vite = await createServer({
    root: process.cwd(),
    server: { middlewareMode: "ssr" },
  });

  const config_path = join(process.cwd(), "tella.config.ts");
  const config = (await vite.ssrLoadModule(config_path)).default;

  console.log({ config });

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      let doc = entryDocument();

      if (req.url.startsWith("/frame")) {
        doc = frameDocument();
      }

      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.end(doc);
    });
  });

  server.listen(port, () => {
    console.log(`\ntella at http://localhost:${port}/\n`);
  });
}

function entryDocument() {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>tella</title>
  </head>
  <body>
    <h1>tella</h1>
    <div id="entry-root"><div>
    <iframe src="/frame.html"></iframe>
    <script type="module" src="/node_modules/tella/src/entry.ts"></script>
  </body>
</html>`;
}

function frameDocument() {
  return `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <h1>iframe! component</h1>
    <div id="frame-root"><div>
    <script type="module" src="/node_modules/tella/src/frame.ts"></script>
  </body>
</html>`;
}
