import { setup, handlers, debug, info } from "https://deno.land/std@0.91.0/log/mod.ts";
import { getLibPath } from "./utils.ts";

await setup({
  handlers: {
    console: new handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
 }
})

const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();

const plguinPath = getLibPath("deno_plugin_ffi");

const rid = Deno.openPlugin(plguinPath);

const {
  op_ffi_dlopen: dlOpen,
  op_ffi_dlclose: dlClose,
  op_ffi_call: ffiCall,
} = Deno.core.ops();

if (dlOpen <= 0) {
  throw "bad op id for op_ffi_dlopen";
}

if (dlClose <= 0) {
  throw "bad op id for op_ffi_dlclose";
}

if (ffiCall <= 0) {
  throw "bad op id for op_ffi_call";
}

/** ------------ */

export type FFIType = |
  "int" |
  "string"

export type ReturnType = FFIType

export type ArgTypes = FFIType[]

export type Funcs = { [key: string]: [ReturnType, ArgTypes] }

/**
 * @param libFile name of library
 * @param funcs hash of [retType, [...argType], opts?: {abi?, async?, varargs?}]
 * @param lib hash that will be extended
 */
export function Library<T extends Funcs>(libfile: string, funcs: T, lib?: Record<string, any>) {
  const EXT: '.so' | '.dylib' | '.dll' = ({
    'windows': '.dll',
    'darwin': '.dylib',
    'linux': '.so',
  } as const)[Deno.build.os]

  debug('creating Library object for', libfile);

  if (!libfile.includes(EXT)) {
    debug('appending library extension to library name', EXT);
    libfile += EXT;
  }

  const dll = new DynamicLibrary(libfile)

  const key = Object.keys(funcs!)[0];

  return {
    add: function (num1: number, num2: number): number {
      return dll.ffi_call(num1, num2) as number;
     }
  }
}

if (Deno.build.os === "windows") {
  Library.EXT = ".dll";
}

if (Deno.build.os === "darwin") {
  Library.EXT = ".dylib";
}

if (Deno.build.os === "linux") {
  Library.EXT = ".so";
}

export class DynamicLibrary {
  id: number;

  constructor(path: string) {
    debug('new DynamicLibrary()', path);
    this.id = this.open(path);
  }

  open(path: string): number {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const response = Deno.core.dispatch(
      dlOpen,
      textEncoder.encode(path),
    );

    return response[0];
  }

  ffi_call(...args: number[]): unknown {
    const u8 = new Uint8Array(9);
    const dv = new DataView(u8.buffer);
    dv.setUint8(0, this.id)
    dv.setUint32(1, args[0], true)
    dv.setUint32(5, args[1], true)

    const response = Deno.core.dispatch(
      ffiCall,
      u8,
    );

    console.log("ffi_call response", response)

    return response[0];
  }

  close() {
    const zeroCopy: Uint8Array = new Uint8Array([this.id])

    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    const response = Deno.core.dispatch(
      dlClose,
      zeroCopy,
    );

    debug(`op_ffi_dlclose response: ${response}`);
  }
}