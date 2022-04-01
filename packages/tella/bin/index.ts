export interface TellaConfig {
  plugins?: Array<string>;
}

export function defineTellaConfig(config: TellaConfig = {}): TellaConfig {
  const { plugins = [] } = config;

  return {
    plugins: [...plugins],
  };
}
