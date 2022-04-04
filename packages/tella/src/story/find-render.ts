import type { TellaRenderFunction } from "../define";

export function findRender(): TellaRenderFunction | undefined {
  const rootGlob = import.meta.globEager("tella_root/tella.render.*");
  const rootEntries = Object.entries(rootGlob);
  if (rootEntries?.[0]?.[1]?.default) return rootEntries[0][1].default;

  const tellaGlob = import.meta.globEager("tella_root/.tella/tella.render.*");
  const tellaEntries = Object.entries(tellaGlob);
  if (tellaEntries?.[0]?.[1]?.default) return tellaEntries[0][1].default;
}
