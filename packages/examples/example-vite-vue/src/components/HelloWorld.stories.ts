import HelloWorld from "./HelloWorld.vue";

export default {
  title: "Components/HelloWorld",
};

export const Example = () => ({
  components: { HelloWorld },
  template: `<HelloWorld msg="From Story Change 1" />`,
});
