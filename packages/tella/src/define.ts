import type { PluginOption } from "vite";

export interface StorySize {
  width: number;
  height: number;
}

export interface TellaConfig {
  plugins: Array<PluginOption | Array<PluginOption>>;
  base?: string;
  title?: string;
  alias?: Record<string, string>;
  sizes?: Array<StorySize>;
  outDir?: string;
  minify?: boolean;
  clean?: boolean;
  publicDir?: string | false;
}

export function defineTellaConfig(config: TellaConfig): TellaConfig {
  return {
    base: "/",
    title: "Tella Stories",
    outDir: "dist_tella",
    publicDir: false,
    minify: true,
    clean: true,
    ...config,
  };
}

interface TellaRenderProps<S> {
  root: HTMLElement;
  Story: S;
}

export type TellaRenderFunction<S = unknown> = (props: TellaRenderProps<S>) => void;

export function defineTellaRender<S = unknown>(tellaRenderFunction: TellaRenderFunction<S>): TellaRenderFunction<S> {
  return tellaRenderFunction;
}

export interface StoryConfig {
  title: string;
}

export interface StoryInstance {
  __path: string;
  __config: StoryConfig;
  __stories: Array<string>;
}

export interface Stories {
  [key: string]: Stories | StoryInstance;
}

export function defineTellaStories(config: StoryConfig) {
  return config;
}
