import { join } from "path";
import pluginVue from "@vitejs/plugin-vue";
import pluginReact from "@vitejs/plugin-react";
import pluginPreact from "@preact/preset-vite";
import { createServer, InlineConfig } from "vite";
import type { TellaConfig } from "../index";

export async function getSharedConfig() {
  const tellaConfig = await getTellaConfig();

  const plugins = [];

  if (tellaConfig.type === "vue") plugins.push(pluginVue());
  if (tellaConfig.type === "react") plugins.push(pluginReact());
  if (tellaConfig.type === "preact") plugins.push(pluginPreact());

  const sharedConfig = {
    configFile: false,
    plugins,
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

  let tellaConfig: TellaConfig = {
    title: "Tella Stories",
    render: () => {
      console.error("missing tella.config.{js|jsx|ts|tsx} render function");
    },
  };

  for await (const ext of extensions) {
    try {
      const config_path = join(process.cwd(), `tella.config.${ext}`);
      const config = await vite.ssrLoadModule(config_path);
      tellaConfig = config.default;
      break;
    } catch (e) {}
  }

  await vite.close();

  return tellaConfig;
}
