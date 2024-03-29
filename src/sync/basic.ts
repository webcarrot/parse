import type { ParseFunctionOptions, ParserFunction } from "../types";
import error from "../utils/error";

export default <
    Output,
    Payload extends any,
    Options extends ParseFunctionOptions<Output>
  >(
    fn: ParserFunction<Output, Payload, Options>
  ): typeof fn =>
  (payload, path, options) => {
    if (options.nullable && payload === null) {
      return null as any;
    }
    if (payload === undefined || payload === null) {
      if ("default" in options) {
        return options.default;
      } else if (!options.optional) {
        throw error("Value is required", path, payload);
      } else {
        return;
      }
    }
    return fn(payload, path, options);
  };
