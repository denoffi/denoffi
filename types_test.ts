import { assert } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import * as ffi from "./mod.ts";

function assertType<
  S extends string,
  _T extends ffi.CFunctionDef<S>,
  _P extends ffi.CFunction<S>,
>() {
  return assert(true);
}

Deno.test("\nchar add(char a, char b)\n", (): void => {
  type Add = { "add": { parameters: ["i8", "i8"]; result: "i8" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"\nchar add(char a, char b)", Add, Fn>();
  assertType<"\n char add(char, char)", Add, Fn>();
  assertType<"  \nchar  add(char, char)", Add, Fn>();
  assertType<"char add( char, char)", Add, Fn>();
  assertType<"char add(char, \n char)", Add, Fn>();
  assertType<"char add(char, char) ", Add, Fn>();
  assertType<"char add(char, char )\n", Add, Fn>();
  assertType<" char add( char, char )\n\n", Add, Fn>();
});

Deno.test("char add(char a, char b)", (): void => {
  type Add = { "add": { parameters: ["i8", "i8"]; result: "i8" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"char add(char a, char b)", Add, Fn>();
  assertType<" char add(char, char)", Add, Fn>();
  assertType<"char  add(char, char)", Add, Fn>();
  assertType<"char add( char, char)", Add, Fn>();
  assertType<"char add(char,  char)", Add, Fn>();
  assertType<"char add(char, char) ", Add, Fn>();
  assertType<"char add(char, char )", Add, Fn>();
  assertType<" char add( char, char )", Add, Fn>();
});

Deno.test("short add(short a, short b)", (): void => {
  type Add = { "add": { parameters: ["i16", "i16"]; result: "i16" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"short add(short a, short b)", Add, Fn>();
  assertType<" short add(short, short)", Add, Fn>();
  assertType<"short  add(short, short)", Add, Fn>();
  assertType<"short add( short, short)", Add, Fn>();
  assertType<"short add(short,  short)", Add, Fn>();
  assertType<"short add(short, short) ", Add, Fn>();
  assertType<"short add(short, short )", Add, Fn>();
  assertType<" short add( short, short )", Add, Fn>();
});

Deno.test("int add(int a, int b)", (): void => {
  type Add = { "add": { parameters: ["i32", "i32"]; result: "i32" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"int add(int a, int b)", Add, Fn>();
  assertType<" int add(int, int)", Add, Fn>();
  assertType<"int  add(int, int)", Add, Fn>();
  assertType<"int add( int, int)", Add, Fn>();
  assertType<"int add(int,  int)", Add, Fn>();
  assertType<"int add(int, int) ", Add, Fn>();
  assertType<"int add(int, int )", Add, Fn>();
  assertType<" int add( int, int )", Add, Fn>();
});

Deno.test("long add(long a, long b)", (): void => {
  type Add = { "add": { parameters: ["i64", "i64"]; result: "i64" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"long add(long a, long b)", Add, Fn>();
  assertType<" long add(long, long)", Add, Fn>();
  assertType<"long  add(long, long)", Add, Fn>();
  assertType<"long add( long, long)", Add, Fn>();
  assertType<"long add(long,  long)", Add, Fn>();
  assertType<"long add(long, long) ", Add, Fn>();
  assertType<"long add(long, long )", Add, Fn>();
  assertType<" long add( long, long )", Add, Fn>();
});

Deno.test("float add(float a, float b)", (): void => {
  type Add = { "add": { parameters: ["f32", "f32"]; result: "f32" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"float add(float a, float b)", Add, Fn>();
  assertType<" float add(float, float)", Add, Fn>();
  assertType<"float  add(float, float)", Add, Fn>();
  assertType<"float add( float, float)", Add, Fn>();
  assertType<"float add(float,  float)", Add, Fn>();
  assertType<"float add(float, float) ", Add, Fn>();
  assertType<"float add(float, float )", Add, Fn>();
  assertType<" float add( float, float )", Add, Fn>();
});

Deno.test("double add(double a, double b)", (): void => {
  type Add = { "add": { parameters: ["f64", "f64"]; result: "f64" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"double add(double a, double b)", Add, Fn>();
  assertType<" double add(double, double)", Add, Fn>();
  assertType<"double  add(double, double)", Add, Fn>();
  assertType<"double add( double, double)", Add, Fn>();
  assertType<"double add(double,  double)", Add, Fn>();
  assertType<"double add(double, double) ", Add, Fn>();
  assertType<"double add(double, double )", Add, Fn>();
  assertType<" double add( double, double )", Add, Fn>();
});

Deno.test("size_t add(size_t a, size_t b)", (): void => {
  type Add = { "add": { parameters: ["usize", "usize"]; result: "usize" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"size_t add(size_t a, size_t b)", Add, Fn>();
  assertType<" size_t add(size_t, size_t)", Add, Fn>();
  assertType<"size_t  add(size_t, size_t)", Add, Fn>();
  assertType<"size_t add( size_t, size_t)", Add, Fn>();
  assertType<"size_t add(size_t,  size_t)", Add, Fn>();
  assertType<"size_t add(size_t, size_t) ", Add, Fn>();
  assertType<"size_t add(size_t, size_t )", Add, Fn>();
  assertType<" size_t add( size_t, size_t )", Add, Fn>();
});

Deno.test("ptrdiff_t add(ptrdiff_t a, ptrdiff_t b)", (): void => {
  type Add = { "add": { parameters: ["isize", "isize"]; result: "isize" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"ptrdiff_t add(ptrdiff_t a, ptrdiff_t b)", Add, Fn>();
  assertType<" ptrdiff_t add(ptrdiff_t, ptrdiff_t)", Add, Fn>();
  assertType<"ptrdiff_t  add(ptrdiff_t, ptrdiff_t)", Add, Fn>();
  assertType<"ptrdiff_t add( ptrdiff_t, ptrdiff_t)", Add, Fn>();
  assertType<"ptrdiff_t add(ptrdiff_t,  ptrdiff_t)", Add, Fn>();
  assertType<"ptrdiff_t add(ptrdiff_t, ptrdiff_t) ", Add, Fn>();
  assertType<"ptrdiff_t add(ptrdiff_t, ptrdiff_t )", Add, Fn>();
  assertType<" ptrdiff_t add( ptrdiff_t, ptrdiff_t )", Add, Fn>();
});

// Unsigned one
Deno.test("unsigned int add(unsigned int a, unsigned int b)", (): void => {
  type Add = { "add": { parameters: ["u32", "u32"]; result: "u32" } };
  type Fn = { "add": (args_0: number, args_1: number) => number };

  assertType<"unsigned int add(unsigned int a, unsigned int b)", Add, Fn>();
  assertType<" unsigned int add(unsigned int a, unsigned int b)", Add, Fn>();
  assertType<"unsigned int  add(unsigned int a, unsigned int b)", Add, Fn>();
  assertType<"unsigned int add( unsigned int, unsigned int)", Add, Fn>();
  assertType<"unsigned int add(unsigned int,  unsigned int)", Add, Fn>();
  assertType<"unsigned int add(unsigned int, unsigned int) ", Add, Fn>();
  assertType<"unsigned int add(unsigned int, unsigned int )", Add, Fn>();
  assertType<" unsigned int add( unsigned int, unsigned int )", Add, Fn>();
});

// Unit function: Return the parameter itself
Deno.test("char unit(char a)", (): void => {
  type Unit = { "unit": { parameters: ["i8"]; result: "i8" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"char unit(char a)", Unit, Fn>();
  assertType<"char unit(char)", Unit, Fn>();
  assertType<" char unit(char a)", Unit, Fn>();
  assertType<"char  unit(char a)", Unit, Fn>();
  assertType<"char unit(  char a)", Unit, Fn>();
  assertType<"char unit (char a )", Unit, Fn>();
  assertType<" char  unit(  char a  )", Unit, Fn>();
});

Deno.test("short unit(short a)", (): void => {
  type Unit = { "unit": { parameters: ["i16"]; result: "i16" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"short unit(short a)", Unit, Fn>();
  assertType<"short unit(short)", Unit, Fn>();
  assertType<" short unit(short a)", Unit, Fn>();
  assertType<"short  unit(short a)", Unit, Fn>();
  assertType<"short unit(  short a)", Unit, Fn>();
  assertType<"short unit (short a )", Unit, Fn>();
  assertType<" short  unit(  short a  )", Unit, Fn>();
});

Deno.test("int unit(int a)", (): void => {
  type Unit = { "unit": { parameters: ["i32"]; result: "i32" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"int unit(int a)", Unit, Fn>();
  assertType<"int unit(int)", Unit, Fn>();
  assertType<" int unit(int a)", Unit, Fn>();
  assertType<"int  unit(int a)", Unit, Fn>();
  assertType<"int unit(  int a)", Unit, Fn>();
  assertType<"int unit (int a )", Unit, Fn>();
  assertType<" int  unit(  int a  )", Unit, Fn>();
});

Deno.test("long unit(long a)", (): void => {
  type Unit = { "unit": { parameters: ["i64"]; result: "i64" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"long unit(long a)", Unit, Fn>();
  assertType<"long unit(long)", Unit, Fn>();
  assertType<" long unit(long a)", Unit, Fn>();
  assertType<"long  unit(long a)", Unit, Fn>();
  assertType<"long unit(  long a)", Unit, Fn>();
  assertType<"long unit (long a )", Unit, Fn>();
  assertType<" long  unit(  long a  )", Unit, Fn>();
});

Deno.test("float unit(float a)", (): void => {
  type Unit = { "unit": { parameters: ["f32"]; result: "f32" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"float unit(float a)", Unit, Fn>();
  assertType<"float unit(float)", Unit, Fn>();
  assertType<" float unit(float a)", Unit, Fn>();
  assertType<"float  unit(float a)", Unit, Fn>();
  assertType<"float unit(  float a)", Unit, Fn>();
  assertType<"float unit (float a )", Unit, Fn>();
  assertType<" float  unit(  float a  )", Unit, Fn>();
});

Deno.test("double unit(double a)", (): void => {
  type Unit = { "unit": { parameters: ["f64"]; result: "f64" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"double unit(double a)", Unit, Fn>();
  assertType<"double unit(double)", Unit, Fn>();
  assertType<" double unit(double a)", Unit, Fn>();
  assertType<"double  unit(double a)", Unit, Fn>();
  assertType<"double unit(  double a)", Unit, Fn>();
  assertType<"double unit (double a )", Unit, Fn>();
  assertType<" double  unit(  double a  )", Unit, Fn>();
});

Deno.test("size_t unit(size_t a)", (): void => {
  type Unit = { "unit": { parameters: ["usize"]; result: "usize" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"size_t unit(size_t a)", Unit, Fn>();
  assertType<"size_t unit(size_t)", Unit, Fn>();
  assertType<" size_t unit(size_t a)", Unit, Fn>();
  assertType<"size_t  unit(size_t a)", Unit, Fn>();
  assertType<"size_t unit(  size_t a)", Unit, Fn>();
  assertType<"size_t unit (size_t a )", Unit, Fn>();
  assertType<" size_t  unit(  size_t a  )", Unit, Fn>();
});

Deno.test("ptrdiff_t unit(ptrdiff_t a)", (): void => {
  type Unit = { "unit": { parameters: ["isize"]; result: "isize" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"ptrdiff_t unit(ptrdiff_t a)", Unit, Fn>();
  assertType<"ptrdiff_t unit(ptrdiff_t)", Unit, Fn>();
  assertType<" ptrdiff_t unit(ptrdiff_t a)", Unit, Fn>();
  assertType<"ptrdiff_t  unit(ptrdiff_t a)", Unit, Fn>();
  assertType<"ptrdiff_t unit(  ptrdiff_t a)", Unit, Fn>();
  assertType<"ptrdiff_t unit (ptrdiff_t a )", Unit, Fn>();
  assertType<" ptrdiff_t  unit(  ptrdiff_t a  )", Unit, Fn>();
});

Deno.test("unsigned int unit(unsigned int a)", (): void => {
  type Unit = { "unit": { parameters: ["u32"]; result: "u32" } };
  type Fn = { "unit": (args_0: number) => number };

  assertType<"unsigned int unit(unsigned int a)", Unit, Fn>();
  assertType<"unsigned int unit(unsigned int)", Unit, Fn>();
  assertType<" unsigned int unit(unsigned int a)", Unit, Fn>();
  assertType<"unsigned int  unit(unsigned int a)", Unit, Fn>();
  assertType<"unsigned int unit(  unsigned int a)", Unit, Fn>();
  assertType<"unsigned int unit (unsigned int a )", Unit, Fn>();
  assertType<" unsigned int  unit(  unsigned int a  )", Unit, Fn>();
});

Deno.test("char foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i8" } };
  type Fn = { "foo": () => number };

  assertType<"char foo()", Foo, Fn>();
  assertType<" char foo()", Foo, Fn>();
  assertType<"char  foo()", Foo, Fn>();
  assertType<" char  foo()", Foo, Fn>();
  assertType<"  char    foo(    )", Foo, Fn>();
});

Deno.test("short foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i16" } };
  type Fn = { "foo": () => number };

  assertType<"short foo()", Foo, Fn>();
  assertType<" short foo()", Foo, Fn>();
  assertType<"short  foo()", Foo, Fn>();
  assertType<" short  foo()", Foo, Fn>();
  assertType<"  short    foo(    )", Foo, Fn>();
});

Deno.test("int foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i32" } };
  type Fn = { "foo": () => number };

  assertType<"int foo()", Foo, Fn>();
  assertType<" int foo()", Foo, Fn>();
  assertType<"int  foo()", Foo, Fn>();
  assertType<" int  foo()", Foo, Fn>();
  assertType<"  int    foo(    )", Foo, Fn>();
});

Deno.test("long foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "i64" } };
  type Fn = { "foo": () => number };

  assertType<"long foo()", Foo, Fn>();
  assertType<" long foo()", Foo, Fn>();
  assertType<"long  foo()", Foo, Fn>();
  assertType<" long  foo()", Foo, Fn>();
  assertType<"  long    foo(    )", Foo, Fn>();
});

Deno.test("float foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "f32" } };
  type Fn = { "foo": () => number };

  assertType<"float foo()", Foo, Fn>();
  assertType<" float foo()", Foo, Fn>();
  assertType<"float  foo()", Foo, Fn>();
  assertType<" float  foo()", Foo, Fn>();
  assertType<"  float    foo(    )", Foo, Fn>();
});

Deno.test("double foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "f64" } };
  type Fn = { "foo": () => number };

  assertType<"double foo()", Foo, Fn>();
  assertType<" double foo()", Foo, Fn>();
  assertType<"double  foo()", Foo, Fn>();
  assertType<" double  foo()", Foo, Fn>();
  assertType<"  double    foo(    )", Foo, Fn>();
});

Deno.test("size_t foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "usize" } };
  type Fn = { "foo": () => number };

  assertType<"size_t foo()", Foo, Fn>();
  assertType<" size_t foo()", Foo, Fn>();
  assertType<"size_t  foo()", Foo, Fn>();
  assertType<" size_t  foo()", Foo, Fn>();
  assertType<"  size_t    foo(    )", Foo, Fn>();
});

Deno.test("ptrdiff_t foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "isize" } };
  type Fn = { "foo": () => number };

  assertType<"ptrdiff_t foo()", Foo, Fn>();
  assertType<" ptrdiff_t foo()", Foo, Fn>();
  assertType<"ptrdiff_t  foo()", Foo, Fn>();
  assertType<" ptrdiff_t  foo()", Foo, Fn>();
  assertType<"  ptrdiff_t    foo(    )", Foo, Fn>();
});

Deno.test("unsigned int foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "u32" } };
  type Fn = { "foo": () => number };

  assertType<"unsigned int foo()", Foo, Fn>();
  assertType<" unsigned int foo()", Foo, Fn>();
  assertType<"unsigned int  foo()", Foo, Fn>();
  assertType<" unsigned int  foo()", Foo, Fn>();
  assertType<"  unsigned int    foo(    )", Foo, Fn>();
});

Deno.test("void foo()", (): void => {
  type Foo = { "foo": { parameters: []; result: "void" } };
  type Fn = { "foo": () => void };

  assertType<"void foo()", Foo, Fn>();
  assertType<" void foo()", Foo, Fn>();
  assertType<"void  foo()", Foo, Fn>();
  assertType<"void foo() ", Foo, Fn>();
  assertType<"void foo(   )", Foo, Fn>();
  assertType<"   void    foo(   )   ", Foo, Fn>();
});

Deno.test("never", (): void => {
  assertType<"", never, never>();
  assertType<"  ", never, never>();
  assertType<"int add", never, never>();
  assertType<"int add(", never, never>();
  assertType<"int add)", never, never>();
  assertType<"add()", never, never>();
});

Deno.test("double foo();", (): void => {
  type Foo = { "foo": { parameters: []; result: "f64" } };
  type Fn = { "foo": () => number };

  assertType<"double foo();", Foo, Fn>();
  assertType<" double foo();", Foo, Fn>();
  assertType<"double  foo();", Foo, Fn>();
  assertType<" double  foo();", Foo, Fn>();
  assertType<"  double    foo(    );", Foo, Fn>();
});

Deno.test("int foo();int bar()", (): void => {
  type Foo = {
    "foo": { parameters: []; result: "i32" };
    "bar": { parameters: []; result: "i32" };
  };
  type Fn = {
    "foo": () => number;
    "bar": () => number;
  };

  assertType<"int foo();int bar();", Foo, Fn>();
  assertType<" int foo(); int  bar();", Foo, Fn>();
  assertType<"int  foo();  int bar();", Foo, Fn>();
  assertType<" int  foo();int   bar();", Foo, Fn>();
  assertType<"  int    foo(    );int bar( );", Foo, Fn>();
});
