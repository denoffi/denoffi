import { assert } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import * as ffi from "./mod.ts";

function assertType<S extends string, T extends ffi.CFunction<S>>() {
  return assert(true);
}

Deno.test("\nchar add(char a, char b)\n", (): void => {
  type Add = { "add": { parameters: ["i8", "i8"]; result: "i8" } };

  assertType<"\nchar add(char a, char b)", Add>();
  assertType<"\n char add(char, char)", Add>();
  assertType<"  \nchar  add(char, char)", Add>();
  assertType<"char add( char, char)", Add>();
  assertType<"char add(char, \n char)", Add>();
  assertType<"char add(char, char) ", Add>();
  assertType<"char add(char, char )\n", Add>();
  assertType<" char add( char, char )\n\n", Add>();
});

Deno.test("char add(char a, char b)", (): void => {
  type Add = { "add": { parameters: ["i8", "i8"]; result: "i8" } };

  assertType<"char add(char a, char b)", Add>();
  assertType<" char add(char, char)", Add>();
  assertType<"char  add(char, char)", Add>();
  assertType<"char add( char, char)", Add>();
  assertType<"char add(char,  char)", Add>();
  assertType<"char add(char, char) ", Add>();
  assertType<"char add(char, char )", Add>();
  assertType<" char add( char, char )", Add>();
});

Deno.test("short add(short a, short b)", (): void => {
  type Add = { "add": { parameters: ["i16", "i16"]; result: "i16" } };

  assertType<"short add(short a, short b)", Add>();
  assertType<" short add(short, short)", Add>();
  assertType<"short  add(short, short)", Add>();
  assertType<"short add( short, short)", Add>();
  assertType<"short add(short,  short)", Add>();
  assertType<"short add(short, short) ", Add>();
  assertType<"short add(short, short )", Add>();
  assertType<" short add( short, short )", Add>();
});

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

Deno.test("long add(long a, long b)", (): void => {
  type Add = { "add": { parameters: ["i64", "i64"]; result: "i64" } };

  assertType<"long add(long a, long b)", Add>();
  assertType<" long add(long, long)", Add>();
  assertType<"long  add(long, long)", Add>();
  assertType<"long add( long, long)", Add>();
  assertType<"long add(long,  long)", Add>();
  assertType<"long add(long, long) ", Add>();
  assertType<"long add(long, long )", Add>();
  assertType<" long add( long, long )", Add>();
});

Deno.test("float add(float a, float b)", (): void => {
  type Add = { "add": { parameters: ["f32", "f32"]; result: "f32" } };

  assertType<"float add(float a, float b)", Add>();
  assertType<" float add(float, float)", Add>();
  assertType<"float  add(float, float)", Add>();
  assertType<"float add( float, float)", Add>();
  assertType<"float add(float,  float)", Add>();
  assertType<"float add(float, float) ", Add>();
  assertType<"float add(float, float )", Add>();
  assertType<" float add( float, float )", Add>();
});

Deno.test("double add(double a, double b)", (): void => {
  type Add = { "add": { parameters: ["f64", "f64"]; result: "f64" } };

  assertType<"double add(double a, double b)", Add>();
  assertType<" double add(double, double)", Add>();
  assertType<"double  add(double, double)", Add>();
  assertType<"double add( double, double)", Add>();
  assertType<"double add(double,  double)", Add>();
  assertType<"double add(double, double) ", Add>();
  assertType<"double add(double, double )", Add>();
  assertType<" double add( double, double )", Add>();
});

Deno.test("size_t add(size_t a, size_t b)", (): void => {
  type Add = { "add": { parameters: ["usize", "usize"]; result: "usize" } };

  assertType<"size_t add(size_t a, size_t b)", Add>();
  assertType<" size_t add(size_t, size_t)", Add>();
  assertType<"size_t  add(size_t, size_t)", Add>();
  assertType<"size_t add( size_t, size_t)", Add>();
  assertType<"size_t add(size_t,  size_t)", Add>();
  assertType<"size_t add(size_t, size_t) ", Add>();
  assertType<"size_t add(size_t, size_t )", Add>();
  assertType<" size_t add( size_t, size_t )", Add>();
});

Deno.test("ptrdiff_t add(ptrdiff_t a, ptrdiff_t b)", (): void => {
  type Add = { "add": { parameters: ["isize", "isize"]; result: "isize" } };

  assertType<"ptrdiff_t add(ptrdiff_t a, ptrdiff_t b)", Add>();
  assertType<" ptrdiff_t add(ptrdiff_t, ptrdiff_t)", Add>();
  assertType<"ptrdiff_t  add(ptrdiff_t, ptrdiff_t)", Add>();
  assertType<"ptrdiff_t add( ptrdiff_t, ptrdiff_t)", Add>();
  assertType<"ptrdiff_t add(ptrdiff_t,  ptrdiff_t)", Add>();
  assertType<"ptrdiff_t add(ptrdiff_t, ptrdiff_t) ", Add>();
  assertType<"ptrdiff_t add(ptrdiff_t, ptrdiff_t )", Add>();
  assertType<" ptrdiff_t add( ptrdiff_t, ptrdiff_t )", Add>();
});

// Unsigned one
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

// Unit function: Return the parameter itself
Deno.test("char unit(char a)", (): void => {
  type Unit = { "unit": { parameters: ["i8"]; result: "i8" } };

  assertType<"char unit(char a)", Unit>();
  assertType<"char unit(char)", Unit>();
  assertType<" char unit(char a)", Unit>();
  assertType<"char  unit(char a)", Unit>();
  assertType<"char unit(  char a)", Unit>();
  assertType<"char unit (char a )", Unit>();
  assertType<" char  unit(  char a  )", Unit>();
});

Deno.test("short unit(short a)", (): void => {
  type Unit = { "unit": { parameters: ["i16"]; result: "i16" } };

  assertType<"short unit(short a)", Unit>();
  assertType<"short unit(short)", Unit>();
  assertType<" short unit(short a)", Unit>();
  assertType<"short  unit(short a)", Unit>();
  assertType<"short unit(  short a)", Unit>();
  assertType<"short unit (short a )", Unit>();
  assertType<" short  unit(  short a  )", Unit>();
});

Deno.test("int unit(int a)", (): void => {
  type Unit = { "unit": { parameters: ["i32"]; result: "i32" } };

  assertType<"int unit(int a)", Unit>();
  assertType<"int unit(int)", Unit>();
  assertType<" int unit(int a)", Unit>();
  assertType<"int  unit(int a)", Unit>();
  assertType<"int unit(  int a)", Unit>();
  assertType<"int unit (int a )", Unit>();
  assertType<" int  unit(  int a  )", Unit>();
});

Deno.test("long unit(long a)", (): void => {
  type Unit = { "unit": { parameters: ["i64"]; result: "i64" } };

  assertType<"long unit(long a)", Unit>();
  assertType<"long unit(long)", Unit>();
  assertType<" long unit(long a)", Unit>();
  assertType<"long  unit(long a)", Unit>();
  assertType<"long unit(  long a)", Unit>();
  assertType<"long unit (long a )", Unit>();
  assertType<" long  unit(  long a  )", Unit>();
});

Deno.test("float unit(float a)", (): void => {
  type Unit = { "unit": { parameters: ["f32"]; result: "f32" } };

  assertType<"float unit(float a)", Unit>();
  assertType<"float unit(float)", Unit>();
  assertType<" float unit(float a)", Unit>();
  assertType<"float  unit(float a)", Unit>();
  assertType<"float unit(  float a)", Unit>();
  assertType<"float unit (float a )", Unit>();
  assertType<" float  unit(  float a  )", Unit>();
});

Deno.test("double unit(double a)", (): void => {
  type Unit = { "unit": { parameters: ["f64"]; result: "f64" } };

  assertType<"double unit(double a)", Unit>();
  assertType<"double unit(double)", Unit>();
  assertType<" double unit(double a)", Unit>();
  assertType<"double  unit(double a)", Unit>();
  assertType<"double unit(  double a)", Unit>();
  assertType<"double unit (double a )", Unit>();
  assertType<" double  unit(  double a  )", Unit>();
});

Deno.test("size_t unit(size_t a)", (): void => {
  type Unit = { "unit": { parameters: ["usize"]; result: "usize" } };

  assertType<"size_t unit(size_t a)", Unit>();
  assertType<"size_t unit(size_t)", Unit>();
  assertType<" size_t unit(size_t a)", Unit>();
  assertType<"size_t  unit(size_t a)", Unit>();
  assertType<"size_t unit(  size_t a)", Unit>();
  assertType<"size_t unit (size_t a )", Unit>();
  assertType<" size_t  unit(  size_t a  )", Unit>();
});

Deno.test("ptrdiff_t unit(ptrdiff_t a)", (): void => {
  type Unit = { "unit": { parameters: ["isize"]; result: "isize" } };

  assertType<"ptrdiff_t unit(ptrdiff_t a)", Unit>();
  assertType<"ptrdiff_t unit(ptrdiff_t)", Unit>();
  assertType<" ptrdiff_t unit(ptrdiff_t a)", Unit>();
  assertType<"ptrdiff_t  unit(ptrdiff_t a)", Unit>();
  assertType<"ptrdiff_t unit(  ptrdiff_t a)", Unit>();
  assertType<"ptrdiff_t unit (ptrdiff_t a )", Unit>();
  assertType<" ptrdiff_t  unit(  ptrdiff_t a  )", Unit>();
});

Deno.test("unsigned int unit(unsigned int a)", (): void => {
  type Unit = { "unit": { parameters: ["u32"]; result: "u32" } };

  assertType<"unsigned int unit(unsigned int a)", Unit>();
  assertType<"unsigned int unit(unsigned int)", Unit>();
  assertType<" unsigned int unit(unsigned int a)", Unit>();
  assertType<"unsigned int  unit(unsigned int a)", Unit>();
  assertType<"unsigned int unit(  unsigned int a)", Unit>();
  assertType<"unsigned int unit (unsigned int a )", Unit>();
  assertType<" unsigned int  unit(  unsigned int a  )", Unit>();
});

Deno.test("char foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i8" } };

  assertType<"char foo()", Foo>();
  assertType<" char foo()", Foo>();
  assertType<"char  foo()", Foo>();
  assertType<" char  foo()", Foo>();
  assertType<"  char    foo(    )", Foo>();
});

Deno.test("short foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i16" } };

  assertType<"short foo()", Foo>();
  assertType<" short foo()", Foo>();
  assertType<"short  foo()", Foo>();
  assertType<" short  foo()", Foo>();
  assertType<"  short    foo(    )", Foo>();
});

Deno.test("int foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i32" } };

  assertType<"int foo()", Foo>();
  assertType<" int foo()", Foo>();
  assertType<"int  foo()", Foo>();
  assertType<" int  foo()", Foo>();
  assertType<"  int    foo(    )", Foo>();
});

Deno.test("long foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i64" } };

  assertType<"long foo()", Foo>();
  assertType<" long foo()", Foo>();
  assertType<"long  foo()", Foo>();
  assertType<" long  foo()", Foo>();
  assertType<"  long    foo(    )", Foo>();
});

Deno.test("float foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "f32" } };

  assertType<"float foo()", Foo>();
  assertType<" float foo()", Foo>();
  assertType<"float  foo()", Foo>();
  assertType<" float  foo()", Foo>();
  assertType<"  float    foo(    )", Foo>();
});

Deno.test("double foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "f64" } };

  assertType<"double foo()", Foo>();
  assertType<" double foo()", Foo>();
  assertType<"double  foo()", Foo>();
  assertType<" double  foo()", Foo>();
  assertType<"  double    foo(    )", Foo>();
});

Deno.test("size_t foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "usize" } };

  assertType<"size_t foo()", Foo>();
  assertType<" size_t foo()", Foo>();
  assertType<"size_t  foo()", Foo>();
  assertType<" size_t  foo()", Foo>();
  assertType<"  size_t    foo(    )", Foo>();
});

Deno.test("ptrdiff_t foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "isize" } };

  assertType<"ptrdiff_t foo()", Foo>();
  assertType<" ptrdiff_t foo()", Foo>();
  assertType<"ptrdiff_t  foo()", Foo>();
  assertType<" ptrdiff_t  foo()", Foo>();
  assertType<"  ptrdiff_t    foo(    )", Foo>();
});

Deno.test("unsigned int foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "u32" } };

  assertType<"unsigned int foo()", Foo>();
  assertType<" unsigned int foo()", Foo>();
  assertType<"unsigned int  foo()", Foo>();
  assertType<" unsigned int  foo()", Foo>();
  assertType<"  unsigned int    foo(    )", Foo>();
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
