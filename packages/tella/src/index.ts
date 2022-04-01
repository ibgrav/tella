import type { UserConfig } from "vite";

interface TellaConfig {
  plugins?: UserConfig["plugins"];
}

export function defineTellaConfig(config: TellaConfig = {}): TellaConfig {
  const { plugins = [] } = config;

  return {
    plugins: [...plugins],
  };
}
