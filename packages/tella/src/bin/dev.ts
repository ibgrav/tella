import type { Stories, TellaConfig } from "..";
import { InlineConfig, createServer } from "vite";
import { Server } from "http";
import { document } from "./document.js";

export async function dev(userConfig: TellaConfig, viteConfig: InlineConfig) {
  const vite = await createServer(viteConfig);

  //do not accept user base in dev mode
  userConfig.base = "";

  const server = new Server((req, res) => {
    vite.middlewares(req, res, async () => {
      const url = req.url || "/";

      const stories: Stories = (await vite.ssrLoadModule("node_modules/tella/src/stories.ts", { fixStacktrace: true })).stories;

      let src = "node_modules/tella/src/client/ui/index.ui.ts";

      if (url.startsWith("/story.html")) {
        src = "node_modules/tella/src/client/story/index.story.ts";
      }

      let doc = document({ src, stories, userConfig });
      doc = await vite.transformIndexHtml(req.url || "/", doc);

      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.end(doc);
    });
  });

  const port = parseInt(process.env.PORT || "6001");

  server.listen(port, () => {
    console.log(`\n📚 http://localhost:${port}/ 📚\n`);
  });
}
