import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncReturnType, AsyncParser } from "./types";

export default function<V>(
  types: Array<Parser<V> | AsyncParser<V>>,
  options?: ParseFunctionOptions<V>
): AsyncParser<V>;
export default function<T extends Parser<any> | AsyncParser<any>>(
  types: T[],
  options?: ParseFunctionOptions<AsyncReturnType<T>>
): AsyncParser<AsyncReturnType<T>>;
