import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParserFunction, AsyncParser } from "./types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

const handleArray = <T extends Parser<any> | AsyncParser<any>>(
  payload: any,
  path: string,
  type: T
) => {
  if (payload instanceof Array) {
    return Promise.all(
      payload.map((v, no) => {
        try {
          return type(v, makePath(path, no));
        } catch (err) {
          return Promise.reject(err);
        }
      })
    );
  } else {
    return Promise.reject(error("Array", path, payload));
  }
};

const makeArray = <T>(
  type: Parser<T> | AsyncParser<T>
): AsyncParserFunction<Array<T>> => (payload, path) =>
  handleArray(payload, path, type);

export default <T>(
  type: Parser<T> | AsyncParser<T>,
  options?: ParseFunctionOptions<Array<T>>
) => make<Array<T>>(basic(makeArray(type)), options);
