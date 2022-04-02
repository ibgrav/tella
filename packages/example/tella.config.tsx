import type { TellaConfig } from "tella";
import type { ComponentType } from "react";
import { render } from "react-dom";

import "src/index.css";

const config: TellaConfig<ComponentType<any>> = {
  title: "Example Stories",
  type: "react",
  alias: {
    src: "./src",
  },
  render: ({ root, Story }) => {
    render(<Story />, root);
  },
};

export default config;
