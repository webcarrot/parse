import { ParserFunction, ParseFunctionOptions } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleEq = <T>(payload: any, path: string, value: T) => {
  if (payload === value) {
    return value;
  } else {
    throw error(value, path, payload);
  }
};

export const makeEq = <T>(value: T): ParserFunction<T> => (payload, path) =>
  handleEq(payload, path, value);

export default <T>(value: T, options?: ParseFunctionOptions<T>) =>
  make(basic(makeEq(value)), options);
