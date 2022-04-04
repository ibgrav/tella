//https://github.com/lukeed/dset
export function dset<T extends object, V>(obj: T, keys: string | ArrayLike<string | number>, val: V): void {
  if (typeof keys === "string") keys = keys.split(".");

  var i = 0,
    l = keys.length,
    t = obj,
    x,
    k;
  while (i < l) {
    k = keys[i++];
    if (k === "__proto__" || k === "constructor" || k === "prototype") break;
    //@ts-ignore
    t = t[k] =
      //@ts-ignore
      i === l ? val : typeof (x = t[k]) === typeof keys ? x : keys[i] * 0 !== 0 || !!~("" + keys[i]).indexOf(".") ? {} : [];
  }
}
