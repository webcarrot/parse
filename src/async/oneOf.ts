import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error } from "../utils";
import { MakeParserOut } from "../sync/types";

export const handleOnOf = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  payload: any,
  path: string,
  types: Array<T | TS>
) =>
  types
    .reduce(
      (out, type) => out.catch(() => type(payload, path)),
      Promise.reject()
    )
    .catch(() => {
      throw error("One of", path, payload);
    });

export const makeOnOf = <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  types: Array<T | TS>
): AsyncParserFunction<AsyncReturnType<T | TS>> => (payload, _, path) =>
  handleOnOf(payload, path, types);

export default <
  T extends AsyncMakeParserOut<any>,
  TS extends MakeParserOut<any>
>(
  types: Array<T | TS>,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: AsyncReturnType<T>
): AsyncMakeParserOut<AsyncParserFunction<AsyncReturnType<T | TS>>> =>
  make(makeOnOf<T, TS>(types), optional, nullable, convert, defaultValue);
