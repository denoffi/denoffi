type TrimStart<T extends string> = T extends ` ${infer R}` ? TrimStart<R>
  : T extends `\n${infer R}` ? TrimStart<R>
  : T extends `\t${infer R}` ? TrimStart<R>
  : T;
type TrimEnd<T extends string> = T extends `${infer R} ` ? TrimEnd<R>
  : T extends `${infer R}\n` ? TrimEnd<R>
  : T extends `${infer R}\t` ? TrimEnd<R>
  : T;
type Trim<T extends string> = TrimStart<TrimEnd<T>>;

type IsUnsigned<T> = T extends `unsigned ${string}` ? T : never;
type RealType<T> = T extends `unsigned ${infer RT}` ? RT : T;
type Combined<M extends string, T extends string> = `${M} ${T}`;

type ParseName<T> = T extends `unsigned ${infer R} ${infer F}(${infer Rest})`
  ? Record<
    Trim<F>,
    { parameters: ParseParams<Trim<Rest>>; result: ToNative<`unsigned ${R}`> }
  >
  : T extends `${infer R} ${infer F}(${infer Rest})` ? Record<
    Trim<F>,
    { parameters: ParseParams<Trim<Rest>>; result: ToNative<R> }
  >
  : never;

type ParseNames<T> = T extends `${infer R};${infer Rest}`
  ? ParseName<R> | ParseNames<Rest>
  : ParseName<T>;

type ParseParams<T> = T extends "" ? []
  : T extends IsUnsigned<T>
    ? (T extends `${infer M} ${infer K} ${string},${infer R}`
      ? [ToNative<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K},${infer R}`
        ? [ToNative<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K} ${string}` ? [ToNative<Combined<M, K>>]
      : T extends `${infer M} ${infer K}` ? [ToNative<Combined<M, K>>]
      : [])
  : (T extends `${infer K} ${string},${infer R}`
    ? [ToNative<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K},${infer R}` ? [ToNative<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K} ${string}` ? [ToNative<K>]
    : T extends `${infer K}` ? [ToNative<K>]
    : []);

type ToNative<T> = T extends IsUnsigned<T> ? (RealType<T> extends "char" ? "u8"
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

export type CFunction<T extends string> = ParseNames<Trim<T>>;

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
