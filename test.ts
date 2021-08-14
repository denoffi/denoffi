import { assert } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import * as ffi from "./mod.ts";

function assertType<S extends string, T extends ffi.CFunction<S>>() {
  return assert(true);
}

Deno.test("int add(int a, int b)", (): void => {
  type Add = { "add": { parameters: ["i32", "i32"]; result: "i32" } };

  assertType<"int add(int a, int b)", Add>();
  assertType<" int add(int, int)", Add>();
  assertType<"int  add(int, int)", Add>();
  assertType<"int add( int, int)", Add>();
  assertType<"int add(int,  int)", Add>();
  assertType<"int add(int, int) ", Add>();
  assertType<"int add(int, int )", Add>();
  assertType<" int add( int, int )", Add>();
});

Deno.test("unsigned int add(unsigned int a, unsigned int b)", (): void => {
  type Add = { "add": { parameters: ["u32", "u32"]; result: "u32" } };

  assertType<"unsigned int add(unsigned int a, unsigned int b)", Add>();
  assertType<" unsigned int add(unsigned int a, unsigned int b)", Add>();
  assertType<"unsigned int  add(unsigned int a, unsigned int b)", Add>();
  assertType<"unsigned int add( unsigned int, unsigned int)", Add>();
  assertType<"unsigned int add(unsigned int,  unsigned int)", Add>();
  assertType<"unsigned int add(unsigned int, unsigned int) ", Add>();
  assertType<"unsigned int add(unsigned int, unsigned int )", Add>();
  assertType<" unsigned int add( unsigned int, unsigned int )", Add>();
});

Deno.test("int abs(int a)", (): void => {
  type Abs = { "abs": { parameters: ["i32"]; result: "i32" } };

  assertType<"int abs(int a)", Abs>();
  assertType<"int abs(int)", Abs>();
  assertType<" int abs(int a)", Abs>();
  assertType<"int  abs(int a)", Abs>();
  assertType<"int abs(  int a)", Abs>();
  assertType<"int abs (int a )", Abs>();
  assertType<" int  abs(  int a  )", Abs>();
});

Deno.test("int foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i32" } };

  assertType<"int foo()", Foo>();
  assertType<" int foo()", Foo>();
  assertType<"int  foo()", Foo>();
  assertType<" int  foo()", Foo>();
  assertType<"  int    foo(    )", Foo>();
});

Deno.test("void foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "void" } };

  assertType<"void foo()", Foo>();
  assertType<" void foo()", Foo>();
  assertType<"void  foo()", Foo>();
  assertType<"void foo() ", Foo>();
  assertType<"void foo(   )", Foo>();
  assertType<"   void    foo(   )   ", Foo>();
});

Deno.test("never", (): void => {
  assertType<"", never>();
  assertType<"  ", never>();
  assertType<"int add", never>();
  assertType<"int add(", never>();
  assertType<"int add)", never>();
  assertType<"add()", never>();
});
