import type {
  ParseFunctionOptions,
  Parser,
  AsyncParserFunction,
  AsyncParser,
  AsyncReturnType,
} from "../types";
import make from "./make";
import basic from "./basic";
import { error, isPlainObject, makePath } from "../utils";

type ShapeReturnType<
  S extends { [key: string]: Parser<any> | AsyncParser<any> }
> = { [K in keyof S]: AsyncReturnType<S[K]> };

const handleShape = <
  T extends Parser<any> | AsyncParser<any>,
  S extends { [key: string]: T }
>(
  payload: any,
  path: string,
  data: S,
  keys: Array<Extract<keyof S, string>>
) => {
  if (!isPlainObject(payload)) {
    return Promise.reject(error("Value is not an plain object", path, payload));
  }
  return keys.reduce(
    (p, key) =>
      p.then((out) => {
        try {
          const value = data[key](payload[key], makePath(path, key));
          if (value instanceof Promise) {
            return value.then((value) => {
              if (value !== undefined) {
                out[key] = value;
              }
              return out;
            });
          } else {
            if (value !== undefined) {
              out[key] = value;
            }
            return Promise.resolve(out);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }),
    Promise.resolve({} as ShapeReturnType<typeof data>)
  );
};

const makeShape =
  <
    MPO extends Parser<any> | AsyncParser<any>,
    Shape extends { [key: string]: MPO }
  >(
    data: Shape
  ): AsyncParserFunction<ShapeReturnType<Shape>> =>
  (payload, path) =>
    handleShape(
      payload,
      path,
      data,
      Object.keys(data) as Array<Extract<keyof Shape, string>>
    );

export default function <V extends { [key: string]: any }>(
  data: { [K in keyof V]: Parser<V[K]> | AsyncParser<V[K]> },
  options?: ParseFunctionOptions<V>
): AsyncParser<V>;
export default function <
  MPO extends Parser<any> | AsyncParser<any>,
  Shape extends { [key: string]: MPO }
>(
  data: Shape,
  options?: ParseFunctionOptions<ShapeReturnType<Shape>>
): AsyncParser<ShapeReturnType<Shape>>;
export default function (data: any, options?: any): any {
  return make(basic(makeShape(data)), options);
}
