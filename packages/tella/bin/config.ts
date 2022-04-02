import { join } from "path";
import pluginReact from "@vitejs/plugin-react";
import { createServer, InlineConfig } from "vite";
import type { TellaConfig } from "../index";

export async function getSharedConfig() {
  const tellaConfig = await getTellaConfig();

  const sharedConfig = {
    configFile: false,
    plugins: [pluginReact()],
    resolve: {
      alias: [{ find: "root", replacement: join(process.cwd()) }],
    },
  };

  for (const [key, path] of Object.entries(tellaConfig.alias || {})) {
    const replacement = join(process.cwd(), path);
    sharedConfig!.resolve!.alias!.push({ find: key, replacement });
  }

  return { sharedConfig: sharedConfig as InlineConfig, tellaConfig };
}

export async function getTellaConfig(): Promise<TellaConfig> {
  const vite = await createServer({ server: { middlewareMode: "ssr" } });
  const extensions = ["js", "jsx", "ts", "tsx"];

  let tellaConfig: TellaConfig = {};

  for await (const ext of extensions) {
    try {
      const config_path = join(process.cwd(), `tella.config.${ext}`);
      tellaConfig = (await vite.ssrLoadModule(config_path)).default;
      break;
    } catch (e) {
      console.log((e as Error).message);
    }
  }

  await vite.close();

  return tellaConfig;
}
