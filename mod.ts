type CType =
  | "size_t"
  | "ptrdiff_t" // signed version of size_t
  | "char"
  | "short"
  | "int"
  | "long"
  | "float"
  | "double";

type TrimStart<T extends string> = T extends ` ${infer R}` ? TrimStart<R> : T;
type TrimEnd<T extends string> = T extends `${infer R} ` ? TrimEnd<R> : T;
type Trim<T extends string> = TrimStart<TrimEnd<T>>;

type IsUnsigned<T> = T extends `unsigned ${string}` ? T : never;
type RealType<T> = T extends `unsigned ${infer RT}` ? RT : T;
type Combined<M extends string, T extends string> = `${M} ${T}`;

type ParseName<T> = T extends `unsigned ${infer R} ${infer F}(${infer Rest})`
  ? Record<
    Trim<F>,
    { parameters: ParseParams<Trim<Rest>>; result: toNative<`unsigned ${R}`> }
  >
  : T extends `${infer R} ${infer F}(${infer Rest})` ? Record<
    Trim<F>,
    { parameters: ParseParams<Trim<Rest>>; result: toNative<R> }
  >
  : never;

type ParseParams<T> = T extends "" ? []
  : T extends IsUnsigned<T>
    ? (T extends `${infer M} ${infer K} ${string},${infer R}`
      ? [toNative<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K},${infer R}`
        ? [toNative<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K} ${string}` ? [toNative<Combined<M, K>>]
      : T extends `${infer M} ${infer K}` ? [toNative<Combined<M, K>>]
      : [])
  : (T extends `${infer K} ${string},${infer R}`
    ? [toNative<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K},${infer R}` ? [toNative<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K} ${string}` ? [toNative<K>]
    : T extends `${infer K}` ? [toNative<K>]
    : []);

type toNative<T> = T extends IsUnsigned<T> ? (RealType<T> extends "char" ? "u8"
  : RealType<T> extends "short" ? "u16"
  : RealType<T> extends "int" ? "u32"
  : RealType<T> extends "long" ? "u64"
  : never)
  : (RealType<T> extends "char" ? "i8"
    : RealType<T> extends "short" ? "i16"
    : RealType<T> extends "int" ? "i32"
    : RealType<T> extends "long" ? "i64"
    : RealType<T> extends "float" ? "f32"
    : RealType<T> extends "double" ? "f64"
    : RealType<T> extends "void" ? "void"
    : RealType<T> extends "size_t" ? "usize"
    : RealType<T> extends "ptrdiff_t" ? "isize"
    : never);

export type CFunction<T extends string> = ParseName<Trim<T>>;

export enum VoidType {
  void = "void",
}

export enum NumberType {
  u8 = "u8",
  i8 = "i8",
  u16 = "u16",
  i16 = "i16",
  u32 = "u32",
  i32 = "i32",
  u64 = "u64",
  i64 = "i64",
  usize = "usize",
  isize = "isize",
  f32 = "f32",
  f64 = "f64",
}

export type types =
  | VoidType
  | NumberType;
