import { assert } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import * as ffi from "./mod.ts";

function assertType<S extends string, T extends ffi.CFuntion<S>>() {
  return assert(true);
}

Deno.test("int add(int a, int b)", (): void => {
  assertType<"int add(int a, int b)", ["add", ["i32", "i32"], "i32"]>();
  assertType<" int add(int, int)", ["add", ["i32", "i32"], "i32"]>();
  assertType<"int  add(int, int)", ["add", ["i32", "i32"], "i32"]>();
  assertType<"int add( int, int)", ["add", ["i32", "i32"], "i32"]>();
  assertType<"int add(int,  int)", ["add", ["i32", "i32"], "i32"]>();
  assertType<"int add(int, int) ", ["add", ["i32", "i32"], "i32"]>();
  assertType<"int add(int, int )", ["add", ["i32", "i32"], "i32"]>();
  assertType<" int add( int, int )", ["add", ["i32", "i32"], "i32"]>();
});

Deno.test("int abs(int a)", (): void => {
  assertType<"int abs(int a)", ["abs", ["i32"], "i32"]>();
  assertType<"int abs(int)", ["abs", ["i32"], "i32"]>();
  assertType<" int abs(int a)", ["abs", ["i32"], "i32"]>();
  assertType<"int  abs(int a)", ["abs", ["i32"], "i32"]>();
  assertType<"int abs(  int a)", ["abs", ["i32"], "i32"]>();
  assertType<"int abs (int a )", ["abs", ["i32"], "i32"]>();
  assertType<" int  abs(  int a  )", ["abs", ["i32"], "i32"]>();
});

Deno.test("int foo()", (): void => {
  assertType<"int foo()", ["foo", [], "i32"]>();
  assertType<" int foo()", ["foo", [], "i32"]>();
  assertType<"int  foo()", ["foo", [], "i32"]>();
  assertType<" int  foo()", ["foo", [], "i32"]>();
  assertType<"  int    foo(    )", ["foo", [], "i32"]>();
});

Deno.test("void foo()", (): void => {
  assertType<"void foo()", ["foo", [], "void"]>();
  assertType<" void foo()", ["foo", [], "void"]>();
  assertType<"void  foo()", ["foo", [], "void"]>();
  assertType<"void foo() ", ["foo", [], "void"]>();
  assertType<"void foo(   )", ["foo", [], "void"]>();
  assertType<"   void    foo(   )   ", ["foo", [], "void"]>();
});

Deno.test("never", (): void => {
  assertType<"", never>();
  assertType<"  ", never>();
  assertType<"int add", never>();
  assertType<"int add(", never>();
  assertType<"int add)", never>();
  assertType<"add()", never>();
});
