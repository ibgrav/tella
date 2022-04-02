import { defineTellaStories } from "tella";
import { App } from "./app";

export default defineTellaStories({
  title: "App!",
});

export const Main = () => <App />;
