import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const [, , , typescriptFlag] = process.argv;

export async function create() {
  const pkgString = await readFile(join(process.cwd(), "package.json"), "utf-8");
  const { dependencies, devDependencies } = JSON.parse(pkgString) as Record<string, Record<string, string>>;

  let fw = "";
  let plugin = { fn: "", name: "", import: "" };
  let render = { fn: "", import: "", type: "", typeGeneric: "", typeImport: "" };

  if (dependencies.vue) {
    fw = "vue";

    plugin.fn = "pluginVue";
    plugin.name = "@vitejs/plugin-vue";
    plugin.import = `import ${plugin.fn} from "${plugin.name}";`;

    render.type = "VueElement";
    render.typeGeneric = `() => ${render.type}`;
    render.typeImport = `import type { ${render.type} } from "vue";`;
    render.import = 'import { createApp } from "vue/dist/vue.esm-bundler";';
    render.fn = `createApp(Story()).mount(root);`;
  }

  if (dependencies.react) {
    fw = "react";

    plugin.fn = "pluginReact";
    plugin.name = "@vitejs/plugin-react";
    plugin.import = `import ${plugin.fn} from "${plugin.name}";`;

    render.type = "ComponentType";
    render.typeImport = `import type { ${render.type} } from 'react';`;

    if (/^.?18./.test(dependencies.react)) {
      render.import = 'import { createRoot } from "react-dom/client";';
      render.fn = `createRoot(root).render(<Story />);`;
    } else {
      render.import = 'import { render } from "react-dom";';
      render.fn = "render(<App />, root);";
    }
  }

  if (dependencies.svelte) {
    fw = "svelte";

    plugin.fn = "pluginSvelte";
    plugin.name = "@sveltejs/vite-plugin-svelte";
    plugin.import = `import { svelte as ${plugin.fn} } from "${plugin.name}";`;

    render.typeGeneric = "any";
    render.fn = `  const { Component, props } = Story();
  new Component({ props, target: root });`;
  }

  if (dependencies.preact) {
    fw = "preact";
    plugin.fn = "pluginPreact";
    plugin.name = "@preact/preset-vite";
    plugin.import = `import ${plugin.fn} from "${plugin.name}";`;

    render.type = "FunctionalComponent";
    render.typeImport = `import type { ${render.type} } from 'preact';`;
    render.import = 'import { render } from "preact";';
    render.fn = `render(<Story />, root);`;
  }

  console.log(fw, "detected");

  const IS_TS = typescriptFlag === "--typescript" || devDependencies.typescript;
  if (IS_TS) console.log("typescript detected");

  const configFileName = `tella.config.${IS_TS ? "t" : "j"}s`;

  console.log(`writing ./${configFileName}`);

  const tellaConfig = `${plugin.import}
import { defineTellaConfig } from "tella";

export default defineTellaConfig({
  plugins: [${plugin.fn}()],
});
`;

  await writeFile(join(process.cwd(), configFileName), tellaConfig);

  const tellaRender = `${IS_TS && render.typeImport ? render.typeImport + "\n" : ""}${
    render.import ? render.import + "\n" : ""
  }import { defineTellaRender } from "tella";

export default defineTellaRender${IS_TS ? `<${render.typeGeneric || render.type}>` : ""}(({ root, Story }) => {
  ${render.fn}
});  
  `;

  const IS_JSX = fw === "react" || fw === "preact";
  const renderFileName = `tella.render.${IS_TS ? "t" : "j"}s${IS_JSX ? "x" : ""}`;

  console.log(`writing ./${renderFileName}`);

  await writeFile(join(process.cwd(), renderFileName), tellaRender);

  console.log(`\nnpm install -D tella ${plugin.name}\n`);
}
