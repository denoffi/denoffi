# deno_plugin_ffi (WIP & Need Help)

[![Build Status](https://github.com/justjavac/deno_plugin_ffi/workflows/ci/badge.svg?branch=master)](https://github.com/justjavac/deno_plugin_ffi/actions)
[![tag](https://img.shields.io/github/release/justjavac/deno_plugin_ffi)](https://github.com/justjavac/deno_plugin_ffi/releases)
[![Crates.io](https://img.shields.io/crates/v/deno_plugin_ffi)](https://crates.io/crates/deno_plugin_ffi)
[![Docs.rs](https://docs.rs/deno_plugin_ffi/badge.svg)](https://docs.rs/deno_plugin_ffi)
[![license](https://img.shields.io/github/license/justjavac/deno_plugin_ffi)](https://github.com/justjavac/deno_plugin_ffi/blob/master/LICENSE)

**Deno Foreign Function Interface.**

deno_ffi is a Deno plugin for loading and calling dynamic libraries using pure JavaScript/TypeScript. It can be used to create bindings to native libraries without writing any Rust code.

It also simplifies the augmentation of Deno with Rust/C/C++ code as it takes care of handling the translation of types across JavaScript/TypeScript and C/Rust, which can add reams of boilerplate code to your otherwise simple C/Rust. See the `example/` for an example of this use case.

## Example

```ts
import * as ffi from "https://deno.land/x/ffi/mod.ts";

const libm = ffi.Library('libm', {
  'add': [ 'int', [ 'int', 'int' ] ]
});
libm.add(1, 2); // 3

// You can also access just functions in the current process by passing a null
var current = ffi.Library(null, {
  'btoa': [ 'string', [ 'string' ] ]
});
current.btoa('1234'); // MTIzNA==
```

### License

[deno_plugin_ffi](https://github.com/justjavac/deno_plugin_ffi) is released under the MIT License. See the bundled [LICENSE](./LICENSE) file for details.
