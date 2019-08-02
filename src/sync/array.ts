import { ParserFunction, MakeParserOut } from "./types";
import make from "./make";
import { error, makePath } from "../utils";

const handleArray = <T extends MakeParserOut<any>>(
  payload: any,
  path: string,
  type: T
) => {
  if (payload instanceof Array) {
    return payload.map((v, no) => type(v, makePath(path, no)));
  } else {
    throw error("Array", path, payload);
  }
};

const makeArray = <T extends MakeParserOut<any>>(
  type: T
): ParserFunction<Array<ReturnType<T>>> => (payload, _, path) =>
  handleArray(payload, path, type);

export default <T extends MakeParserOut<any>>(
  type: T,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: Array<ReturnType<T>>
) => make(makeArray(type), optional, nullable, convert, defaultValue);
