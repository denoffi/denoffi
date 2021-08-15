// FOR THOSE WHO LOVES JAVASCRIPT AND DON'T WANT TO USE TYPESCRIPT

import { assertEquals } from "https://deno.land/std@0.104.0/testing/asserts.ts";

class SyntaxError extends Error {}

/**
 *
 * @param {string} sigString C Style function signature string
 * @typedef {"void"
 * | "u8"
 * | "i8"
 * | "u16"
 * | "i16"
 * | "u32"
 * | "i32"
 * | "u64"
 * | "i64"
 * | "usize"
 * | "isize"
 * | "f32"
 * | "f64"} Types
 * @return { {[K: string]: {parameters: Types[], result: Types}} | never } returns deno ffi function typing structure
 */
export function fromCSignature(sigString) {
  // function name and return type
  const reg1 =
    /^\s*?(?<R>(unsigned\s*?)?((size_t)|(ptrdiff_t)|(char)|(short)|(int)|(long)|(float)|(double)))\s+?(?<FN>[^0-9\W].*?)\s*?\((?<P>.*?)\);?$/;
  // res
  const reg2 =
    /(?:,\s*)?(?<T>(unsigned\s+)?((size_t)|(ptrdiff_t)|(char)|(short)|(int)|(long)|(float)|(double)))/gm;
  const typeMapping = {
    size_t: "usize",
    ptrdiff_t: "isize",
    char: "i8",
    short: "i16",
    int: "i32",
    long: "i64",
    float: "f32",
    double: "f64",
    "unsigned char": "u8",
    "unsigned short": "u16",
    "unsigned int": "u32",
    "unsigned long": "u64",
  };
  const result1 = sigString.match(reg1);
  if (result1 !== null) {
    const returnType = typeMapping?.[result1.groups["R"]];
    const functionName = result1.groups["FN"];
    const params = result1.groups["P"];
    const paramTypes = params.matchAll(reg2);
    const parameters = [...paramTypes].map((it) => typeMapping?.[it?.[1]]);

    if (
      parameters.some((it) => typeof it !== "string") ||
      parameters[0].startsWith(",")
    ) {
      throw new SyntaxError(
        "The C Function signature you have given is not valid. Params is not valid",
      );
    } else if (!functionName) {
      throw new SyntaxError(
        "The C Function signature you have given is not valid. Function name is not valid)",
      );
    } else if (!returnType) {
      throw new SyntaxError(
        "The C Function signature you have given is not valid. Return type is not valid)",
      );
    }

    return { [functionName]: { parameters, result: returnType } };
  } else {
    throw new SyntaxError(
      "The C Function signature you have given is not valid.",
    );
  }
}

Deno.test(
  `hello`,
  () => {
    assertEquals(fromCSignature("unsigned int a1(float a, double b);"), {
      "a1": { parameters: ["f32", "f64"], result: "u32" },
    });
  },
);
