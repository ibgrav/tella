import { ReactNode } from "react";

export type TellaReactWrapper = (props: { children: ReactNode }) => JSX.Element;

export interface TellaConfig {
  alias?: Record<string, string>;
  ReactWrapper?: TellaReactWrapper;
}
