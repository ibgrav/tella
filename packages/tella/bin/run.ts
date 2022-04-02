import { dev } from "./dev";
import { build } from "./build";

const [, , command] = process.argv;

if (command === "dev") {
  dev();
}

if (command === "build") {
  build();
}
