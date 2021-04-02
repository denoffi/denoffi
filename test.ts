import { Library } from "./mod.ts";

const lib = Library("libadd", {
  "add": ["int", ["int"]],
});

const sum = lib.add(1, 2);

console.log("sum=%i", sum);
