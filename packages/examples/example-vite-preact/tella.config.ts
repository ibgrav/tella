import { defineTellaConfig } from "tella";
import preact from "@preact/preset-vite";

export default defineTellaConfig({
  plugins: [preact()],
  base: "/stories/",
  outDir: "dist/stories",
});
