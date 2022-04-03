import App from "./App.vue";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "App",
};

export const Primary = () => ({
  components: { App },
  template: "<App />",
});

export const Secondary = () => ({
  components: { App },
  template: "<App />",
});
