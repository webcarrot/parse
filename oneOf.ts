import { ParserFunction, MakeParserOut } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleOnOf = <T extends MakeParserOut<any>>(
  payload: any,
  types: T[]
) => {
  for (let i in types) {
    try {
      return types[i](payload);
    } catch (_) {}
  }
  throw new Error(ERR_INVALID_VALUE);
};

export const makeOnOf = <T extends MakeParserOut<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (payload: any) =>
  handleOnOf(payload, types);

export const oneOf = <T extends MakeParserOut<any>>(
  types: T[]
): MakeParserOut<ParserFunction<ReturnType<T>>> => make(makeOnOf(types));
