import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import make from "./make";
import { error } from "../utils";

export const handleOnOf = <T extends AsyncMakeParserOut<any>>(
  payload: any,
  path: string,
  types: T[]
) =>
  types
    .reduce(
      (out, type) => out.catch(() => type(payload, path)),
      Promise.reject()
    )
    .catch(() => error("One of", path, payload));

export const makeOnOf = <T extends AsyncMakeParserOut<any>>(
  types: T[]
): AsyncParserFunction<AsyncReturnType<T>> => (payload, _, path) =>
  handleOnOf(payload, path, types);

export default <T extends AsyncMakeParserOut<any>>(
  types: T[],
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: AsyncReturnType<T>
): AsyncMakeParserOut<AsyncParserFunction<AsyncReturnType<T>>> =>
  make(makeOnOf<T>(types), optional, nullable, convert, defaultValue);
