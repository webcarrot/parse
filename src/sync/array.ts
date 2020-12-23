import type { ParseFunctionOptions, ParserFunction, Parser } from "../types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

const handleArray = <T>(payload: any, path: string, type: Parser<T>) => {
  if (payload instanceof Array) {
    return payload.map((v, no) => type(v, makePath(path, no)));
  } else {
    throw error("Expect array of type", path, payload);
  }
};

const makeArray = <T>(type: Parser<T>): ParserFunction<Array<T>> => (
  payload,
  path
) => handleArray(payload, path, type);

export default <T>(type: Parser<T>, options?: ParseFunctionOptions<Array<T>>) =>
  make<Array<T>>(basic(makeArray(type)), options);
