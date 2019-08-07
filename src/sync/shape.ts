import { ParserFunction, ParseFunctionOptions, MakeParserOut } from "./types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

export const isPlainObject = (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;

export const handleShape = <
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  payload: any,
  path: string,
  data: S
) => {
  if (!isPlainObject(payload)) {
    throw error("Object", path, payload);
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

type ShapeReturnType<S extends { [key: string]: MakeParserOut<any> }> = {
  [K in keyof S]: ReturnType<S[K]>
};

export const makeShape = <
  T extends MakeParserOut<any>,
  S extends { [key: string]: T }
>(
  data: S
): ParserFunction<ShapeReturnType<S>> => (payload, path) =>
  handleShape(payload, path, data);

export default <T extends MakeParserOut<any>, S extends { [key: string]: T }>(
  data: S,
  options?: ParseFunctionOptions<ShapeReturnType<S>>
) => make(basic(makeShape(data)), options);
