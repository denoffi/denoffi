type CType =
  | "int"
  | "long"
  | "float";

type TrimStart<T extends string> = T extends ` ${infer R}` ? TrimStart<R> : T;
type TrimEnd<T extends string> = T extends `${infer R} ` ? TrimEnd<R> : T;
type Trim<T extends string> = TrimStart<TrimEnd<T>>;

type ParseName<T> = T extends `${infer R} ${infer P}(${infer Rest})`
  ? [Trim<P>, ParseParams<Trim<Rest>>, toNative<R>]
  : never;

type ParseParams<T> = T extends "" ? []
  : T extends `${infer K} ${string},${infer R}`
    ? [toNative<K>, ...ParseParams<Trim<R>>]
  : T extends `${infer K},${infer R}` ? [toNative<K>, ...ParseParams<Trim<R>>]
  : T extends `${infer K} ${string}` ? [toNative<K>]
  : T extends `${infer K}` ? [toNative<K>]
  : [];

type toNative<T> = T extends "int" ? "i32"
  : T extends "void" ? "void"
  : unknown;

export type CFuntion<T extends string> = ParseName<Trim<T>>;

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
