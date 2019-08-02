import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error, makePath } from "../utils";
import { MakeParserOut } from "../sync/types";

export const isPlainObject = (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;

export const handleShape = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>,
  S extends { [key: string]: T | TS }
>(
  payload: any,
  path: string,
  data: S,
  keys: Array<Extract<keyof S, string>>
) => {
  if (!isPlainObject(payload)) {
    return Promise.reject(error("Object", path, payload));
  }
  return Promise.all(
    keys.map(key => {
      try {
        return data[key](payload[key], makePath(path, key));
      } catch (err) {
        return Promise.reject(err);
      }
    })
  ).then(out =>
    out.reduce<ShapeReturnType<typeof data>>(
      (out, value, no) => {
        if (value !== undefined) {
          out[keys[no]] = value;
        }
        return out;
      },
      {} as ShapeReturnType<typeof data>
    )
  );
};

type ShapeReturnType<
  S extends { [key: string]: AsyncMakeParserOut<any> | MakeParserOut<any> }
> = { [K in keyof S]: AsyncReturnType<S[K]> };

export const makeShape = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>,
  S extends { [key: string]: T | TS }
>(
  data: S,
  keys: Array<Extract<keyof S, string>>
): AsyncParserFunction<ShapeReturnType<typeof data>> => (payload, _, path) =>
  handleShape(payload, path, data, keys);

export default <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>,
  S extends { [key: string]: T | TS }
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
