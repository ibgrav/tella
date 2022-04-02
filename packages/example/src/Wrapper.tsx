import type { TellaReactWrapper } from "tella";

import "src/index.css";

export const Wrapper: TellaReactWrapper = ({ children }) => {
  return (
    <div>
      <h1>Hello World!</h1>
      {children}
    </div>
  );
};
