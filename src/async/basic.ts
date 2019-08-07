import error from "../utils/error";
import { ParseFunctionOptions } from "../types";
import { AsyncParserFunction } from "./types";

export default <
  Output,
  Payload extends any,
  Options extends ParseFunctionOptions<Output>
>(
  fn: AsyncParserFunction<Output, Payload, Options>
): typeof fn => (payload, path, options) => {
  if (options.nullable && payload === null) {
    return Promise.resolve(null);
  }
  if (payload === undefined || payload === null) {
    if ("default" in options) {
      return Promise.resolve(options.default);
    } else if (!options.optional) {
      throw Promise.reject(error("Required", path, payload));
    } else {
      return Promise.resolve();
    }
  }
  return fn(payload, path, options);
};
