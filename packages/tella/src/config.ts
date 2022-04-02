import type { TellaConfig } from "../index";

export const configGlob = import.meta.globEager(`root/tella.config.*`);

export const config_path = Object.keys(configGlob)[0];
export const config = configGlob[config_path].default as TellaConfig;
