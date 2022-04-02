export interface StorySize {
  width: number;
  height: number;
}

interface TellaRenderProps<S> {
  root: HTMLElement;
  Story: S;
}

export type TellaRender<S = unknown> = (props: TellaRenderProps<S>) => void;

export interface TellaConfig<S = unknown> {
  base?: string;
  title?: string;
  alias?: Record<string, string>;
  sizes?: StorySize[];
  outDir?: string;
  minify?: boolean;
  publicDir?: string | boolean;
  render: TellaRender<S>;
}

export function defineTellaConfig<S = unknown>(config: TellaConfig<S> = { render() {} }): TellaConfig<S> {
  return {
    base: "/",
    title: "Tella Stories",
    sizes: [{ width: 1920, height: 1080 }],
    outDir: "dist_tella",
    publicDir: false,
    minify: true,
    ...config,
  };
}

export interface StoryConfig {
  title: string;
}

export interface StoryInstance {
  __path: string;
  __config: StoryConfig;
  __stories: string[];
}

export interface Stories {
  [key: string]: Stories | StoryInstance;
}

export function defineTellaStories(config: StoryConfig) {
  return config;
}
