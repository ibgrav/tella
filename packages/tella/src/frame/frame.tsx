import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const glob = import.meta.globEager(`root/**/*.stories.tsx`);

const components: Array<JSX.Element> = [];

Object.entries(glob).forEach(([path, mod], i) => {
  console.log({ mod });
  Object.entries(mod).forEach(([key, Story], j) => {
    console.log({ key, Story });
    if (key !== "default") {
      components.push(<Story key={`${i}_${j}`} />);
    }
  });
});

console.log({ glob, components });

const root = createRoot(document.getElementById("tella-root")!);

root.render(<StrictMode>{components}</StrictMode>);
