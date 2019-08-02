import { ParserFunction, MakeParserOut } from "./types";
import make from "./make";
import { error } from "../utils";

const handleEq = <T>(payload: any, path: string, value: T) => {
  if (payload === value) {
    return value;
  } else {
    throw error(value, path, payload);
  }
};

const makeEq = <T>(value: T): ParserFunction<T> => (payload, _, path) =>
  handleEq(payload, path, value);

export default <T>(
  value: T,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: T
): MakeParserOut<ParserFunction<T>> =>
  make(makeEq(value), optional, nullable, convert, defaultValue);
