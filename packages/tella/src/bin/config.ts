import { join } from "path";
import { createServer, InlineConfig } from "vite";
import { TellaConfig, defineTellaConfig } from "../index";

export async function getSharedConfig() {
  const config = await getTellaConfig();

  const plugins: any[] = [];

  const plugin_names = ["@vitejs/plugin-vue", "@vitejs/plugin-react", "@preact/preset-vite", "@sveltejs/vite-plugin-svelte"];

  for await (const name of plugin_names) {
    try {
      const pluginVue = (await import(name)).default;
      plugins.push(pluginVue());
    } catch (e) {}
  }

  const sharedConfig = {
    publicDir: config.publicDir || false,
    configFile: false,
    plugins,
    resolve: {
      alias: [{ find: "root", replacement: join(process.cwd()) }],
    },
  };

  for (const [key, path] of Object.entries(config.alias || {})) {
    const replacement = join(process.cwd(), path);
    sharedConfig!.resolve!.alias!.push({ find: key, replacement });
  }

  return { sharedConfig: sharedConfig as InlineConfig, config };
}

export async function getTellaConfig(): Promise<TellaConfig> {
  const vite = await createServer({ server: { middlewareMode: "ssr" } });
  const extensions = ["js", "jsx", "ts", "tsx"];

  let tellaConfig = defineTellaConfig();

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
