# Deno Foreign Function Interface (WIP & Need Help)

[![ci](https://github.com/denoffi/denoffi/actions/workflows/ci.yml/badge.svg)](https://github.com/denoffi/denoffi/actions/workflows/ci.yml)
[![tag](https://img.shields.io/github/release/denoffi/denoffi)](https://github.com/denoffi/denoffi/releases)
[![license](https://img.shields.io/github/license/denoffi/denoffi)](https://github.com/denoffi/denoffi/blob/main/LICENSE)

**Deno Foreign Function Interface.**

## Example

```ts
import * as ffi from "https://deno.land/x/ffi/mod.ts";

type Fn0 = ffi.CFuntion<"int add(int, int)">; // { "add": { parameters: ["i32", "i32"]; result: "i32" } }
type Fn1 = ffi.CFuntion<"long add(long)">; // { "abs": { parameters: ["i64"]; result: "i64" } }
type Fn2 = ffi.CFuntion<"void hello(int)">; // { "hello": { parameters: ["i32"]; result: "void" } }
type Fn3 = ffi.CFuntion<"void hello()">; // { "hello": { parameters: []; result: "void" } }
type Fn4 = ffi.CFuntion<"void hello(void)">; // { "hello": { parameters: ["void"]; result: "void" } }
```

### License

[denoffi](https://github.com/denoffi/denoffi) is released under the MIT License.
See the bundled [LICENSE](./LICENSE) file for details.
