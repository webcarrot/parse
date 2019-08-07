import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncReturnType, AsyncParser, AsyncParserFunction } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleOneOf = <T extends Parser<any> | AsyncParser<any>>(
  payload: any,
  path: string,
  types: T[]
) =>
  types
    .reduce(
      (out, type) => out.catch(() => type(payload, path)),
      Promise.reject()
    )
    .catch(() => {
      throw error("One of", path, payload);
    });

const makeOneOf = <T extends Parser<any> | AsyncParser<any>>(
  types: T[]
): AsyncParserFunction<AsyncReturnType<T>> => (payload, path) =>
  handleOneOf(payload, path, types);

export default <T extends Parser<any> | AsyncParser<any>>(
  types: T[],
  options?: ParseFunctionOptions<AsyncReturnType<T>>
) => make<AsyncReturnType<T>>(basic(makeOneOf(types)), options);
