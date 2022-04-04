#!/usr/bin/env node

import { join } from "path";
import { createServer, InlineConfig } from "vite";
import { defineTellaConfig, TellaConfig } from "../define.js";
import { findFilePath } from "./find-file-path.js";
import { dev } from "./dev.js";
import { build } from "./build.js";

const [, , arg] = process.argv;

exec(arg);

async function exec(arg: string) {
  let vite = await createServer();

  const configFilePath = await findFilePath("tella.config");
  const userConfigModule: TellaConfig = (await vite.ssrLoadModule(configFilePath)).default;

  await vite.close();

  const userConfig = defineTellaConfig(userConfigModule);

  const viteConfig: InlineConfig = {
    configFile: false,
    plugins: userConfig.plugins || [],
    publicDir: userConfig.publicDir || false,
    server: { middlewareMode: "ssr" },
    optimizeDeps: {
      include: ["tella"],
      entries: [],
    },
    resolve: {
      alias: [
        { find: "tella_root", replacement: process.cwd() },
        ...Object.entries(userConfig.alias || {}).map(([key, val]) => {
          return { find: key, replacement: join(process.cwd(), val) };
        }),
      ],
    },
  };

  if (arg === "dev") {
    return await dev(userConfig, viteConfig);
  }

  if (arg === "build") {
    return await build(userConfig, viteConfig);
  }

  throw new Error('missing argument "dev" or "build"');
}
