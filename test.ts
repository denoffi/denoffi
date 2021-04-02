import { Library } from './mod.ts'
import { getLibPath } from "./utils.ts";

const dllPath = getLibPath("example", "example");

const lib = Library(dllPath, {
  'add': ['int', ['int']]
})

const sum = lib.add(1, 2);

console.log("sum=%i", sum)
