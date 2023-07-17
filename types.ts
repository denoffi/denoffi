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

// CFunctionDef

export type CFunctionDef<T extends string> = ParseNames<Trim<T>>;

type ParseNames<T> = T extends `${infer R};${infer Rest}`
  ? ParseName<R> | ParseNames<Rest>
  : ParseName<T>;

type ParseName<T> = T extends `unsigned ${infer R} ${infer F}(${infer Rest})`
  ? Record<
    Trim<F>,
    {
      parameters: ParseParams<Trim<Rest>>;
      result: ToNativeType<`unsigned ${R}`>;
    }
  >
  : T extends `${infer R} ${infer F}(${infer Rest})` ? Record<
      Trim<F>,
      { parameters: ParseParams<Trim<Rest>>; result: ToNativeType<R> }
    >
  : never;

type ParseParams<T> = T extends "" ? []
  : T extends IsUnsigned<T>
    ? (T extends `${infer M} ${infer K} ${string},${infer R}`
      ? [ToNativeType<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K},${infer R}`
        ? [ToNativeType<Combined<M, K>>, ...ParseParams<Trim<R>>]
      : T extends `${infer M} ${infer K} ${string}`
        ? [ToNativeType<Combined<M, K>>]
      : T extends `${infer M} ${infer K}` ? [ToNativeType<Combined<M, K>>]
      : [])
  : (T extends `${infer K} ${string},${infer R}`
    ? [ToNativeType<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K},${infer R}`
      ? [ToNativeType<K>, ...ParseParams<Trim<R>>]
    : T extends `${infer K} ${string}` ? [ToNativeType<K>]
    : T extends `${infer K}` ? [ToNativeType<K>]
    : []);

type ToNativeType<T> = T extends IsUnsigned<T>
  ? (RealType<T> extends "char" ? "u8"
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

// CFunction

export type CFunction<T extends string> = ParseReturns<Trim<T>>;

type ParseReturns<T> = T extends `${infer R};${infer Rest}`
  ? ParseReturn<R> | ParseReturn<Rest>
  : ParseReturn<T>;

type ParseReturn<T> = T extends `unsigned ${infer R} ${infer F}(${infer Rest})`
  ? Record<
    Trim<F>,
    (...args: ParseFnParams<Trim<Rest>>) => ToJsType<`unsigned ${R}`>
  >
  : T extends `${infer R} ${infer F}(${infer Rest})` ? Record<
      Trim<F>,
      (...args: ParseFnParams<Trim<Rest>>) => ToJsType<R>
    >
  : never;

type ParseFnParams<T> = T extends "" ? []
  : T extends IsUnsigned<T>
    ? (T extends `${infer M} ${infer K} ${string},${infer R}`
      ? [ToJsType<Combined<M, K>>, ...ParseFnParams<Trim<R>>]
      : T extends `${infer M} ${infer K},${infer R}`
        ? [ToJsType<Combined<M, K>>, ...ParseFnParams<Trim<R>>]
      : T extends `${infer M} ${infer K} ${string}` ? [ToJsType<Combined<M, K>>]
      : T extends `${infer M} ${infer K}` ? [ToJsType<Combined<M, K>>]
      : [])
  : (T extends `${infer K} ${string},${infer R}`
    ? [ToJsType<K>, ...ParseFnParams<Trim<R>>]
    : T extends `${infer K},${infer R}`
      ? [ToJsType<K>, ...ParseFnParams<Trim<R>>]
    : T extends `${infer K} ${string}` ? [ToJsType<K>]
    : T extends `${infer K}` ? [ToJsType<K>]
    : []);

type ToJsType<T> = T extends IsUnsigned<T>
  ? (RealType<T> extends "char" ? number
    : RealType<T> extends "short" ? number
    : RealType<T> extends "int" ? number
    : RealType<T> extends "long" ? number
    : never)
  : (RealType<T> extends "char" ? number
    : RealType<T> extends "short" ? number
    : RealType<T> extends "int" ? number
    : RealType<T> extends "long" ? number
    : RealType<T> extends "float" ? number
    : RealType<T> extends "double" ? number
    : RealType<T> extends "void" ? void
    : RealType<T> extends "size_t" ? number
    : RealType<T> extends "ptrdiff_t" ? number
    : never);
