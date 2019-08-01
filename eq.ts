import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleEq = <T>(payload: any, value: T) => {
  if (payload === value) {
    return value;
  } else {
    throw new Error(ERR_INVALID_VALUE);
  }
};

export const makeEq = <T>(value: T): ParserFunction<T> => (payload: any) =>
  handleEq(payload, value);

export const eq = <T>(value: T): MakeParserOut<ParserFunction<T>> =>
  make(makeEq(value));
