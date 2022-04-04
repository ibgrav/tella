<script type="ts">
  import { Stories, StoryInstance } from "../define";
  import { pathParam, storyParam } from "../params";

  export let item: Stories | StoryInstance = {};
  export let path: string = "";

  const parent = !Boolean(path);

  const storyLinks = (names: string[]) => {
    return names.map((name) => {
      const active = pathParam?.startsWith(path) && name === storyParam;
      return { name, active };
    });
  };

  const nextItem = (item: Stories | StoryInstance) => {
    return Object.entries(item).map(([name, nextItem]) => {
      const nextPath = path ? `${path}/${name}` : name;
      const active = pathParam && pathParam?.startsWith(nextPath);
      return { nextPath, active, name, nextItem };
    });
  };
</script>

{#if Array.isArray(item.__stories)}
  {#each storyLinks(item.__stories) as { name, active }}
    <a class={active ? "active" : ""} href="?path={path}&story={name}">
      {name}
    </a>
  {/each}
{:else}
  {#each nextItem(item) as { nextPath, active, name, nextItem }}
    <details class={parent ? "parent" : ""} open={active ? true : null}>
      <summary>{name}</summary>
      <svelte:self item={nextItem} path={nextPath} />
    </details>
  {/each}
{/if}
