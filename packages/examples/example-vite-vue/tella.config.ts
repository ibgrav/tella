import { defineTellaConfig } from "tella";
import type { VueElement } from "vue";
import { createApp } from "vue/dist/vue.esm-bundler";

export default defineTellaConfig<() => VueElement>({
  render({ root, Story }) {
    createApp(Story()).mount(root);
  },
});
