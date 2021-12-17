export * from "./types.ts";

export function cstr2ptr(cstr: string): Deno.UnsafePointer {
  const buffer = new Uint8Array([...new TextEncoder().encode(cstr), 0]);
  return Deno.UnsafePointer.of(buffer);
}

export function ptr2cstr(ptr: Deno.UnsafePointer): string {
  if (ptr.value === 0n) {
    return "";
  }
  return new Deno.UnsafePointerView(ptr).getCString();
}

export function ptr2cstr_unchecked(ptr: Deno.UnsafePointer): string {
  return new Deno.UnsafePointerView(ptr).getCString();
}
