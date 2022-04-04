//https://github.com/developit/dlv
export function dlv<T, D = undefined>(
  obj: Record<string, any>,
  key: string | ArrayLike<string | number>,
  def?: D
): T | D | undefined {
  if (typeof key === "string") key = key.split(".");

  for (let p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undefined;
  }

  return obj === undefined ? def : (obj as T);
}
