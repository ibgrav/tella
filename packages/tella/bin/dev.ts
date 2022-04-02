#!/usr/bin/env node

import { Server } from "http";
import { createServer } from "vite";

import { getSharedConfig } from "./config";
import { document } from "./document";

const port = parseInt(process.env.PORT || "6001");

export async function dev() {
  const { sharedConfig } = await getSharedConfig();

  const vite = await createServer({
    ...sharedConfig,
    server: { middlewareMode: "ssr" },
  });

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      const url = req.url || "/";

      let src = "node_modules/tella/src/entry/entry.tsx";

      if (url.startsWith("/story.html")) {
        src = "node_modules/tella/src/story/story.tsx";
      }

      let doc = document({ src });
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
