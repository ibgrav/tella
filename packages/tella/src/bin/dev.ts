import { Server } from "http";
import { createServer } from "vite";

import { getSharedConfig } from "./config";
import { document } from "./document";
import { getStories } from "./stories";

const port = parseInt(process.env.PORT || "6001");

export async function dev() {
  const { sharedConfig, tellaConfig } = await getSharedConfig();

  const vite = await createServer({
    ...sharedConfig,
    server: { middlewareMode: "ssr" },
  });

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      const url = req.url || "/";

      if (url.startsWith("/tella.json")) {
        const { stories } = await getStories(vite);
        res.setHeader("conten-type", "application/json");
        res.end(JSON.stringify({ config: tellaConfig, stories }, null, 2));
        return;
      }

      let src = "node_modules/tella/src/ui/render.ui.ts";

      if (url.startsWith("/story.html")) {
        src = "node_modules/tella/src/story/render.story.ts";
      }

      let doc = document({ command: "dev", src, tellaConfig });
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
