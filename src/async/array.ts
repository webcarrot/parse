import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error, makePath } from "../utils";

const handleArray = <T extends AsyncMakeParserOut<any>>(
  payload: any,
  path: string,
  type: T
) => {
  if (payload instanceof Array) {
    return Promise.all(payload.map((v, no) => type(v, makePath(path, no))));
  } else {
    return Promise.reject(error("Array", path, payload));
  }
};

const makeArray = <T extends AsyncMakeParserOut<any>>(
  type: T
): AsyncParserFunction<Array<AsyncReturnType<T>>> => (payload, _, path) =>
  handleArray(payload, path, type);

export default <T extends AsyncMakeParserOut<any>>(
  type: T,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: Array<AsyncReturnType<T>>
) => make(makeArray(type), optional, nullable, convert, defaultValue);
