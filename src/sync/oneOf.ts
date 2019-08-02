import { ParserFunction, MakeParserOut } from "./types";
import make from "./make";
import { error } from "../utils";

export const handleOneOf = <T extends MakeParserOut<any>>(
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

export const makeOneOf = <T extends MakeParserOut<any>>(
  types: T[]
): ParserFunction<ReturnType<T>> => (payload, _, path) =>
  handleOneOf(payload, path, types);

export default <T, TF extends MakeParserOut<T>[] = MakeParserOut<T>[]>(
  types: TF,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: T
): MakeParserOut<T> =>
  make(makeOneOf(types), optional, nullable, convert, defaultValue);
