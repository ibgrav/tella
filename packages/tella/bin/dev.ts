#!/usr/bin/env node

import { join } from "path";
import { Server } from "http";
import { createServer } from "vite";
import pluginReact from "@vitejs/plugin-react";
import { defineTellaConfig } from ".";
import { TellaConfig } from "./index";

const port = parseInt(process.env.PORT || "6001");

export async function dev() {
  console.log({ process: process.cwd() });

  const vite = await createServer({
    configFile: false,
    plugins: [pluginReact()],
    server: { middlewareMode: "ssr" },
    resolve: {
      alias: [{ find: "root", replacement: join(process.cwd()) }],
    },
  });

  let config: TellaConfig;
  try {
    const config_path = join(process.cwd(), "tella.config.ts");
    config = (await vite.ssrLoadModule(config_path)).default;
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    config = defineTellaConfig();
  }

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      const url = req.url || "/";

      let doc = document({
        src: "/node_modules/tella/src/entry/entry.tsx",
      });

      if (url.startsWith("/frame")) {
        doc = document({
          src: "/node_modules/tella/src/frame/frame.tsx",
        });
      }

      doc = await vite.transformIndexHtml(req.url || "/", doc);

      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.end(doc);
    });
  });

  server.listen(port, () => {
    console.log(`\ntella at http://localhost:${port}/\n`);
  });
}

interface DocumentProps {
  src: string;
  title?: string;
}

function document({ title, src }: DocumentProps) {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title || ""}</title>
  </head>
  <body>
    <div id="tella-root"></div>
    <script type="module" src="${src}"></script>
  </body>
</html>`;
}
