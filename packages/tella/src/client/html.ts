export default function html(strings: TemplateStringsArray, ...args: any[]) {
  const result = strings.map((str, i) => {
    if (args[i]) return str + args[i];
    return str;
  });

  return result.join("");
}
