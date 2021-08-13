# Deno Foreign Function Interface (WIP & Need Help)

[![Build Status](https://github.com/justjavac/denoffi/workflows/ci/badge.svg?branch=main)](https://github.com/justjavac/denoffi/actions)
[![tag](https://img.shields.io/github/release/justjavac/denoffi)](https://github.com/justjavac/denoffi/releases)
[![license](https://img.shields.io/github/license/justjavac/denoffi)](https://github.com/justjavac/denoffi/blob/main/LICENSE)

**Deno Foreign Function Interface.**

## Example

```ts
import * as ffi from "https://deno.land/x/ffi/mod.ts";

type Fn0 = ffi.CFuntion<"int add(int, int)">; // ["add", ["i64", "i64"], "i64"]
type Fn1 = ffi.CFuntion<"int add(int)">; // ["add", ["i64"], "i64"]
type Fn2 = ffi.CFuntion<"void hello(int)">; // ["hello", ["i64"], "void"]
type Fn3 = ffi.CFuntion<"void hello()">; // ["hello", [], "void"]
type Fn4 = ffi.CFuntion<"void hello(void)">; // ["hello", ["void"], "void"]
```

### License

[denoffi](https://github.com/justjavac/denoffi) is released
under the MIT License. See the bundled [LICENSE](./LICENSE) file for details.
