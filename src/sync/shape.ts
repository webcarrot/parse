import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
import make from "./make";
import basic from "./basic";
import { error, isPlainObject, makePath } from "../utils";

type ShapeReturnType<S extends { [key: string]: Parser<any> }> = {
  [K in keyof S]?: ReturnType<S[K]>;
};

const handleShape = <T extends Parser<any>, S extends { [key: string]: T }>(
  payload: any,
  path: string,
  data: S
) => {
  if (!isPlainObject(payload)) {
    throw error("Value is not an plain object", path, payload);
  }
  const out = {} as ShapeReturnType<typeof data>;
  for (let i in data) {
    const v = data[i](payload[i], makePath(path, i));
    if (v !== undefined) {
      out[i] = v;
    }
  }
  return out;
};

const makeShape = <T extends Parser<any>, S extends { [key: string]: T }>(
  data: S
): ParserFunction<ShapeReturnType<S>> => (payload, path) =>
  handleShape(payload, path, data);

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
export default function(data: any, options?: any): any {
  return make(basic(makeShape(data)), options);
}
