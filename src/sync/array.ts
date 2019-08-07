import { ParserFunction, ParseFunctionOptions, MakeParserOut } from "./types";
import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";

const handleArray = <T>(payload: any, path: string, type: MakeParserOut<T>) => {
  if (payload instanceof Array) {
    return payload.map((v, no) => type(v, makePath(path, no)));
  } else {
    throw error("Array", path, payload);
  }
};

const makeArray = <T>(type: MakeParserOut<T>): ParserFunction<Array<T>> => (
  payload,
  path
) => handleArray(payload, path, type);

export default <T>(
  type: MakeParserOut<T>,
  options?: ParseFunctionOptions<Array<T>>
) => make(basic(makeArray(type)), options);
