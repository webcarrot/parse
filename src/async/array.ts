import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error, makePath } from "../utils";
import { MakeParserOut } from "../sync/types";

const handleArray = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  payload: any,
  path: string,
  type: T | TS
) => {
  if (payload instanceof Array) {
    return Promise.all(
      payload.map((v, no) => {
        try {
          return type(v, makePath(path, no));
        } catch (err) {
          return Promise.reject(err);
        }
      })
    );
  } else {
    return Promise.reject(error("Array", path, payload));
  }
};

const makeArray = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  type: T | TS
): AsyncParserFunction<Array<AsyncReturnType<T> | ReturnType<TS>>> => (
  payload,
  _,
  path
) => handleArray(payload, path, type);

export default <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  type: T | TS,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: Array<AsyncReturnType<T> | ReturnType<TS>>
) => make(makeArray(type), optional, nullable, convert, defaultValue);
