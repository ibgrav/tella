import pluginReact from "@vitejs/plugin-react";
import { defineTellaConfig } from "tella";

export default defineTellaConfig({
  plugins: [pluginReact()],
  base: "/tella/",
  outDir: "./public/tella",
  publicDir: "./public",
  alias: {
    src: "./src",
  },
});
