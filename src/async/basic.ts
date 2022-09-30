import type { ParseFunctionOptions, AsyncParserFunction } from "../types";
import error from "../utils/error";

export default <
    Output,
    Payload extends any,
    Options extends ParseFunctionOptions<Output>
  >(
    fn: AsyncParserFunction<Output, Payload, Options>
  ): typeof fn =>
  (payload, path, options) => {
    if (options.nullable && payload === null) {
      return Promise.resolve(null as any);
    }
    if (payload === undefined || payload === null) {
      if ("default" in options) {
        return Promise.resolve(options.default);
      } else if (!options.optional) {
        return Promise.reject(error("Value is required", path, payload));
      } else {
        return Promise.resolve();
      }
    }
    return fn(payload, path, options);
  };
