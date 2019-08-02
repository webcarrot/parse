import { ParserFunction, MakeParserOut } from "./types";
import make from "./make";
import { error } from "../utils";

export const handleOnOf = <T extends MakeParserOut<any>>(
  payload: any,
  path: string,
  types: T[]
) => {
  for (let i in types) {
    try {
      return types[i](payload, path);
    } catch (_) {}
  }
  throw error("One of", path, payload);
};

export const makeOnOf = <T extends MakeParserOut<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (payload, _, path) =>
  handleOnOf(payload, path, types);

export default <T extends MakeParserOut<any>>(
  types: T[],
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: ReturnType<T>
): MakeParserOut<ParserFunction<ReturnType<T>>> =>
  make(makeOnOf<T>(types), optional, nullable, convert, defaultValue);
