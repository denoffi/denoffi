export * from "./types.ts";

export function cstr2ptr(cstr: string): Deno.PointerValue {
  const buffer = new Uint8Array([...new TextEncoder().encode(cstr), 0]);
  return Deno.UnsafePointer.of(buffer);
}

export function ptr2cstr(ptr: Deno.PointerValue): string {
  if (ptr === null) return "";
  if (Deno.UnsafePointer.equals(ptr, null)) return "";
  return new Deno.UnsafePointerView(ptr).getCString();
}

export function ptr2cstr_unchecked(ptr: Deno.PointerValue): string {
  return new Deno.UnsafePointerView(ptr!).getCString();
}

/**
 * Returns a boolean indicating if an environment is little endian.
 */
export function isLittleEndian(): boolean {
  /*
   * Set the uint16 view to a value having distinguishable lower and higher order words.
   *
   * 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
   */
  const uint16 = Uint16Array.of(0x1234);

  // Create a uint8 view on top of the uint16 buffer:
  const uint8view = new DataView(uint16.buffer);

  // If little endian, the least significant byte will be first...
  return (uint8view.getUint8(0) === 0x34);
}
