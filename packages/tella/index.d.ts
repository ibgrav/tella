interface RenderProps<S> {
  root: HTMLElement;
  Story: S;
}

export type Render<S> = (props: RenderProps<S>) => void;

export interface StorySize {
  width: number;
  height: number;
}

export interface TellaConfig<S = any> {
  render: Render<S>;
  title?: string;
  type?: "react" | "vue" | "preact";
  alias?: Record<string, string>;
  sizes?: StorySize[];
}
