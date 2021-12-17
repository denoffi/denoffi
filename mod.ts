export * from "./types.ts";

export function cstr2ptr(cstr: string): Deno.UnsafePointer {
  const buffer = new Uint8Array([...new TextEncoder().encode(cstr), 0]);
  return Deno.UnsafePointer.of(buffer);
}

export function ptr2cstr(ptr: Deno.UnsafePointer): string {
  return new Deno.UnsafePointerView(ptr).getCString();
}
