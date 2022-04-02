import type { TellaConfig } from "tella";
import { Wrapper } from "./src/Wrapper";

const config: TellaConfig = {
  ReactWrapper: Wrapper,
  alias: {
    src: "./src",
  },
};

export default config;
