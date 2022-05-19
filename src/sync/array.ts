import type { ParseFunctionOptions, ParserFunction, Parser } from "../types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

type ArrayParseFunctionOptions<T> = ParseFunctionOptions<Array<T>> & {
  minLength?: number;
  maxLength?: number;
};

const handleArray = <T>(
  payload: any,
  path: string,
  type: Parser<T>,
  options: ArrayParseFunctionOptions<T>
) => {
  if (payload instanceof Array) {
    if (options.minLength !== undefined && payload.length < options.minLength) {
      throw error(
        `Expected array of length greater equal ${options.minLength}`,
        path,
        payload
      );
    }
    if (options.maxLength !== undefined && payload.length > options.maxLength) {
      throw error(
        `Expected array of length lower equal ${options.maxLength}`,
        path,
        payload
      );
    }
    return payload.map((v, no) => type(v, makePath(path, no)));
  } else {
    throw error("Expect array of type", path, payload);
  }
};

const makeArray =
  <T>(
    type: Parser<T>
  ): ParserFunction<Array<T>, any, ArrayParseFunctionOptions<T>> =>
  (payload, path, options) =>
    handleArray(payload, path, type, options);

export default <T>(type: Parser<T>, options?: ArrayParseFunctionOptions<T>) =>
  make<Array<T>>(basic(makeArray(type)), options);
