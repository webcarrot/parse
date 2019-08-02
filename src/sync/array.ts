import { ParserFunction, MakeParserOut } from "./types";
import make from "./make";
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
  _,
  path
) => handleArray(payload, path, type);

export default <T>(
  type: MakeParserOut<T>,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: Array<T>
) => make(makeArray(type), optional, nullable, convert, defaultValue);
