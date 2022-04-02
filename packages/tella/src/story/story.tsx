import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const config = import.meta.globEager(`root/tella.config.*`);
const glob = import.meta.globEager(`root/**/*.stories.tsx`);

console.log({ config });

const components: Array<JSX.Element> = [];

Object.entries(glob).forEach(([path, mod], i) => {
  console.log({ mod });
  Object.entries(mod).forEach(([key, Story], j) => {
    console.log({ key, Story });
    if (key !== "default") {
      components.push(
        <div key={`${i}_${j}`}>
          <Story />
          <br />
          <hr />
        </div>
      );
    }
  });
});

console.log({ glob, components });

const root = createRoot(document.getElementById("tella-root")!);

root.render(<StrictMode>{components}</StrictMode>);
