import type {
  ParseFunctionOptions,
  Parser,
  AsyncReturnType,
  AsyncParser,
  AsyncParserFunction,
} from "../types";
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
      throw error("Value not match", path, payload);
    });

const makeOneOf =
  <T extends Parser<any> | AsyncParser<any>>(
    types: T[]
  ): AsyncParserFunction<AsyncReturnType<T>> =>
  (payload, path) =>
    handleOneOf(payload, path, types);

export default function <V>(
  types: Array<Parser<V> | AsyncParser<V>>,
  options?: ParseFunctionOptions<V>
): AsyncParser<V>;
export default function <T extends Parser<any> | AsyncParser<any>>(
  types: T[],
  options?: ParseFunctionOptions<AsyncReturnType<T>>
): AsyncParser<AsyncReturnType<T>>;
export default function (types: any, options?: any): any {
  return make<any>(basic(makeOneOf(types)), options);
}
