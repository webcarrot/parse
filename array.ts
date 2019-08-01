import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleArray = <T extends MakeParserOut<any>>(
  payload: any,
  type: T
) => {
  if (payload instanceof Array) {
    return payload.map(v => type(v));
  } else {
    throw new Error(ERR_INVALID_VALUE);
  }
};

export const makeArray = <T extends MakeParserOut<any>>(
  type: T
): ParserFunction<Array<ReturnType<T>>> => (payload: any) =>
  handleArray(payload, type);

export const array = <T extends MakeParserOut<any>>(type: T) =>
  make(makeArray(type));
