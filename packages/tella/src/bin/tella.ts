#!/usr/bin/env node

import { join } from "path";
import { createServer, InlineConfig } from "vite";
import glob from "fast-glob";

import { defineTellaConfig, Stories, TellaConfig } from "../index.js";
import { dev } from "./dev.js";
import { build } from "./build.js";

const [, , arg] = process.argv;

exec(arg);

async function exec(arg: string) {
  let vite = await createServer();

  const userConfigName = (await glob("tella.config.*"))[0];

  const userConfigModule: TellaConfig = (await vite.ssrLoadModule(userConfigName)).default;
  await vite.close();

  const userConfig = defineTellaConfig(userConfigModule);

  const viteConfig: InlineConfig = {
    plugins: userConfig.plugins || [],
    configFile: false,
    publicDir: userConfig.publicDir || false,
    server: { middlewareMode: "ssr" },
    optimizeDeps: {
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

  vite = await createServer(viteConfig);
  const stories: Stories = (await vite.ssrLoadModule("tella/src/stories.ts")).stories;
  await vite.close();

  if (arg === "dev") {
    await dev(stories, userConfig, viteConfig);
  }
  if (arg === "build") {
    await build(stories, userConfig, viteConfig);
  }
}
