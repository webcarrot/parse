import { ParserFunction, ParseFunctionOptions, MakeParserOut } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

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
): ParserFunction<ReturnType<T>> => (payload, path) =>
  handleOneOf(payload, path, types);

export default <T, TF extends MakeParserOut<T>[] = MakeParserOut<T>[]>(
  types: TF,
  options?: ParseFunctionOptions<T>
): MakeParserOut<T> => make(basic(makeOneOf(types)), options);
