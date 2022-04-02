export const url = new URL(window.location.href);

export const path_param = url.searchParams.get("path");
export const story_param = url.searchParams.get("story");
export const width_param = url.searchParams.get("width");
export const height_param = url.searchParams.get("height");
