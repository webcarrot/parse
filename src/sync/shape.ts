import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

const isPlainObject = (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;

const handleShape = <T extends Parser<any>, S extends { [key: string]: T }>(
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

type ShapeReturnType<S extends { [key: string]: Parser<any> }> = {
  [K in keyof S]?: ReturnType<S[K]>
};

const makeShape = <T extends Parser<any>, S extends { [key: string]: T }>(
  data: S
): ParserFunction<ShapeReturnType<S>> => (payload, path) =>
  handleShape(payload, path, data);

export default <MPO extends Parser<any>, Shape extends { [key: string]: MPO }>(
  data: Shape,
  options?: ParseFunctionOptions<ShapeReturnType<Shape>>
) => make<ShapeReturnType<Shape>>(basic(makeShape(data)), options);
