import error from "../utils/error";
import { ParseFunctionOptions, ParserFunction } from "./types";

export default <
  Output,
  Payload extends any,
  Options extends ParseFunctionOptions<Output>,
  Fn extends ParserFunction<Output, Payload, Options>
>(
  fn: Fn
): typeof fn =>
  ((payload: Payload, path: string, options: Options) => {
    if (options.nullable && payload === null) {
      return null;
    }
    if (payload === undefined || payload === null) {
      if ("default" in options) {
        return options.default;
      } else if (!options.optional) {
        throw error("Required", path, payload);
      } else {
        return;
      }
    }
    return fn(payload, path, options);
  }) as typeof fn;
