import * as ffi from "./mod.ts";

type Fn0 = ffi.CFuntion<"int add(int, int)">; // ["add", ["i64", "i64"], "i64"]
type Fn1 = ffi.CFuntion<"int add(int)">; // ["add", ["i64"], "i64"]
type Fn2 = ffi.CFuntion<"void hello(int)">; // ["hello", ["i64"], "void"]
type Fn3 = ffi.CFuntion<"void hello()">; // ["hello", [], "void"]
type Fn4 = ffi.CFuntion<"void hello(void)">; // ["hello", ["void"], "void"]

type Z0 = ffi.CFuntion<`int add()`>;
type Z1 = ffi.CFuntion<` int add()`>;
type Z2 = ffi.CFuntion<`int add() `>;
type Z3 = ffi.CFuntion<` int add() `>;
type Z4 = ffi.CFuntion<`void  add()`>;
type Z5 = ffi.CFuntion<` void    add() `>;

type X0 = ffi.CFuntion<`int add(int a, int b)`>;
type X1 = ffi.CFuntion<`int add( int a, int b)`>;
type X2 = ffi.CFuntion<`int add( int a,int b)`>;
type X3 = ffi.CFuntion<`int add( int a, int b )`>;
type X4 = ffi.CFuntion<`int add(  int a, int b )`>;

type Y0 = ffi.CFuntion<`int add( int a)`>;
type Y1 = ffi.CFuntion<`int add(  int a)`>;
type Y2 = ffi.CFuntion<`int add(int a )`>;
type Y3 = ffi.CFuntion<`int add(int a  )`>;
type Y4 = ffi.CFuntion<`int add( int a )`>;
type Y5 = ffi.CFuntion<`int add(  int a   )`>;
type Y6 = ffi.CFuntion<`int add(int  a)`>;
type Y7 = ffi.CFuntion<`int add( int     a) `>;

type V0 = ffi.CFuntion<``>;
type V1 = ffi.CFuntion<` `>;
type V2 = ffi.CFuntion<`int add`>;
type V3 = ffi.CFuntion<`int add(`>;
type V4 = ffi.CFuntion<`add()`>;
type V5 = ffi.CFuntion<`int add(int)`>;
