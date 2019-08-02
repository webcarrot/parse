import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error, makePath } from "../utils";

export const isPlainObject = (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;

export const handleShape = <
  T extends AsyncMakeParserOut<any>,
  S extends { [key: string]: T }
>(
  payload: any,
  path: string,
  data: S,
  keys: Array<Extract<keyof S, string>>
) => {
  if (!isPlainObject(payload)) {
    return Promise.reject(error("Object", path, payload));
  }
  return Promise.all(keys.map(i => data[i](payload, makePath(path, i)))).then(
    out =>
      out.reduce<ShapeReturnType<typeof data>>(
        (out, v, i) => {
          if (v !== undefined) {
            out[i] = v;
          }
          return v;
        },
        {} as ShapeReturnType<typeof data>
      )
  );
};

type ShapeReturnType<S extends { [key: string]: AsyncMakeParserOut<any> }> = {
  [K in keyof S]: AsyncReturnType<S[K]>
};

export const makeShape = <
  T extends AsyncMakeParserOut<any>,
  S extends { [key: string]: T }
>(
  data: S,
  keys: Array<Extract<keyof S, string>>
): AsyncParserFunction<ShapeReturnType<typeof data>> => (payload, _, path) =>
  handleShape(payload, path, data, keys);

export default <
  T extends AsyncMakeParserOut<any>,
  S extends { [key: string]: T }
>(
  data: S,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: ShapeReturnType<typeof data>
) =>
  make(
    makeShape(data, Object.keys(data) as Extract<keyof typeof data, string>[]),
    optional,
    nullable,
    convert,
    defaultValue
  );
