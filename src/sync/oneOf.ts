import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
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
  throw error("One of", path, payload);
};

const makeOneOf = <T extends Parser<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (payload, path) =>
  handleOneOf(payload, path, types);

function onOff<V>(
  types: Parser<V>[],
  options?: ParseFunctionOptions<V>
): Parser<V>;
function onOff<T extends Parser<any>>(
  types: T[],
  options?: ParseFunctionOptions<ReturnType<T>>
): Parser<ReturnType<T>> {
  return make<ReturnType<T>>(basic(makeOneOf(types)), options);
}

export default onOff;
