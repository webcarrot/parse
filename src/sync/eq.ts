import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleEq = <T>(payload: any, path: string, value: T) => {
  if (payload === value) {
    return value;
  } else {
    throw error(`Expected value equal to ${value}`, path, payload);
  }
};

const makeEq = <T>(value: T): ParserFunction<T> => (payload, path) =>
  handleEq(payload, path, value);

export default <T>(value: T, options?: ParseFunctionOptions<T>) =>
  make<T>(basic(makeEq(value)), options);
