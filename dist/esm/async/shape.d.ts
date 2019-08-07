import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser, AsyncReturnType } from "./types";

type ShapeReturnType<
  S extends { [key: string]: Parser<any> | AsyncParser<any> }
> = { [K in keyof S]: AsyncReturnType<S[K]> };

export default function<V extends { [key: string]: any }>(
  data: { [K in keyof V]: Parser<V[K]> | AsyncParser<V[K]> },
  options?: ParseFunctionOptions<V>
): AsyncParser<V>;
export default function<
  MPO extends Parser<any> | AsyncParser<any>,
  Shape extends { [key: string]: MPO }
>(
  data: Shape,
  options?: ParseFunctionOptions<ShapeReturnType<Shape>>
): AsyncParser<ShapeReturnType<Shape>>;
