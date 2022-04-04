import { defineTellaConfig } from "tella";
import type { VueElement } from "vue";
import { createApp } from "vue/dist/vue.esm-bundler";

export default defineTellaConfig<() => VueElement>({
  base: "/dist_tella/",
  outDir: "/public/dist_tella",
  render({ root, Story }) {
    createApp(Story()).mount(root);
  },
});
