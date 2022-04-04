import { defineTellaConfig } from "tella";
import { svelte as pluginSvelte } from "@sveltejs/vite-plugin-svelte";

export default defineTellaConfig({
  plugins: [pluginSvelte()],
});
