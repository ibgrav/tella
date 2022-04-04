import type { VueElement } from "vue";
import { defineTellaRender } from "tella";
import { createApp } from "vue/dist/vue.esm-bundler";

export default defineTellaRender<() => VueElement>(({ root, Story }) => {
  createApp(Story()).mount(root);
});
