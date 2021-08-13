import * as ffi from "./mod.ts";

function assertType<S extends string>(expected: ffi.CFuntion<S>) {
  return expected;
}

assertType<"int add(int a, int b)">(["add", ["i32", "i32"], "i32"]);
assertType<" int add(int, int)">(["add", ["i32", "i32"], "i32"]);
assertType<"int  add(int, int)">(["add", ["i32", "i32"], "i32"]);
assertType<"int add( int, int)">(["add", ["i32", "i32"], "i32"]);
assertType<"int add(int,  int)">(["add", ["i32", "i32"], "i32"]);
assertType<"int add(int, int) ">(["add", ["i32", "i32"], "i32"]);
assertType<"int add(int, int )">(["add", ["i32", "i32"], "i32"]);
assertType<" int add( int, int )">(["add", ["i32", "i32"], "i32"]);

assertType<"int abs(int a)">(["abs", ["i32"], "i32"]);
assertType<"int abs(int)">(["abs", ["i32"], "i32"]);
assertType<" int abs(int a)">(["abs", ["i32"], "i32"]);
assertType<"int  abs(int a)">(["abs", ["i32"], "i32"]);
assertType<"int abs(  int a)">(["abs", ["i32"], "i32"]);
assertType<"int abs (int a )">(["abs", ["i32"], "i32"]);
assertType<" int  abs(  int a  )">(["abs", ["i32"], "i32"]);

assertType<"int foo()">(["foo", [], "i32"]);
assertType<" int foo()">(["foo", [], "i32"]);
assertType<"int  foo()">(["foo", [], "i32"]);
assertType<" int  foo()">(["foo", [], "i32"]);
assertType<"  int    foo(    )">(["foo", [], "i32"]);

assertType<"void foo()">(["foo", [], "void"]);
assertType<" void foo()">(["foo", [], "void"]);
assertType<"void  foo()">(["foo", [], "void"]);
assertType<"void foo() ">(["foo", [], "void"]);
assertType<"void foo(   )">(["foo", [], "void"]);
assertType<"   void    foo(   )   ">(["foo", [], "void"]);

const nan: never = null as never;
assertType<"">(nan);
assertType<"  ">(nan);
assertType<"int add">(nan);
assertType<"int add(">(nan);
assertType<"int add)">(nan);
assertType<"add()">(nan);
