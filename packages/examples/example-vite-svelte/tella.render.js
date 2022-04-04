import { defineTellaRender } from "tella";

export default defineTellaRender(({ Story, root }) => {
  const { Component, props } = Story();
  new Component({ props, target: root });
});
