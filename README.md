# Deno Foreign Function Interface (WIP & Need Help)

[![Build Status](https://github.com/justjavac/deno_plugin_ffi/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno_plugin_ffi/actions)
[![tag](https://img.shields.io/github/release/justjavac/deno_plugin_ffi)](https://github.com/justjavac/deno_plugin_ffi/releases)
[![Crates.io](https://img.shields.io/crates/v/deno_plugin_ffi)](https://crates.io/crates/deno_plugin_ffi)
[![Docs.rs](https://docs.rs/deno_plugin_ffi/badge.svg)](https://docs.rs/deno_plugin_ffi)
[![license](https://img.shields.io/github/license/justjavac/deno_plugin_ffi)](https://github.com/justjavac/deno_plugin_ffi/blob/master/LICENSE)

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

[deno_plugin_ffi](https://github.com/justjavac/deno_plugin_ffi) is released
under the MIT License. See the bundled [LICENSE](./LICENSE) file for details.
