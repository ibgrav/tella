import { defineTellaConfig } from "tella";
import pluginVue from "@vitejs/plugin-vue";

export default defineTellaConfig({
  plugins: [pluginVue()],
  base: "/dist_tella/",
  outDir: "/public/dist_tella",
});
