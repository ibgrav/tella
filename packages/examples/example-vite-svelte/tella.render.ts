import { defineTellaRender } from "tella";

export default defineTellaRender<any>(({ Story, root }) => {
  const { Component, props } = Story();
  new Component({ props, target: root });
});
