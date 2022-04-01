import { dev } from "./dev";

const [, , command] = process.argv;

if (command === "dev") {
  dev();
}
