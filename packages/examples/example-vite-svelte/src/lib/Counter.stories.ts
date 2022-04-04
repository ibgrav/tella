import Counter from "./Counter.svelte";

export default {
  component: Counter,
  title: "Lib/Counter",
};

export const Default = () => ({
  Component: Counter,
});

export const CoundUpdate = () => ({
  Component: Counter,
  props: { count: 20 },
});
