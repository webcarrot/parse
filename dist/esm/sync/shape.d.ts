import { ParseFunctionOptions } from "../types";
import { Parser } from "./types";

type ShapeReturnType<S extends { [key: string]: Parser<any> }> = {
  [K in keyof S]?: ReturnType<S[K]>
};

export default function<V extends { [key: string]: any }>(
  data: { [K in keyof V]: Parser<V[K]> },
  options?: ParseFunctionOptions<V>
): Parser<V>;
export default function<
  MPO extends Parser<any>,
  Shape extends { [key: string]: MPO }
>(
  data: Shape,
  options?: ParseFunctionOptions<ShapeReturnType<Shape>>
): Parser<ShapeReturnType<Shape>>;
