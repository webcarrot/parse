import type { ParseFunctionOptions, ParserFunction, Parser } from "../types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleOneOf = <T extends Parser<any>>(
  payload: any,
  path: string,
  types: T[]
): ReturnType<T> => {
  for (let i = 0; i < types.length; i++) {
    try {
      return types[i](payload, path);
    } catch (_) {}
  }
  throw error("Value not match", path, payload);
};

const makeOneOf = <T extends Parser<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (payload, path) =>
  handleOneOf(payload, path, types);

export default function <V>(
  types: Parser<V>[],
  options?: ParseFunctionOptions<V>
): Parser<V>;
export default function <V, T extends Parser<V>>(
  types: T[],
  options?: ParseFunctionOptions<ReturnType<T>>
): Parser<ReturnType<T>>;
export default function (types: any, options?: any): Parser<any> {
  return make<any>(basic(makeOneOf(types)), options);
}
