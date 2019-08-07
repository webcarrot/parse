import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
import error from "../utils/error";

export default <
  Output,
  Payload extends any,
  Options extends ParseFunctionOptions<Output>
>(
  fn: ParserFunction<Output, Payload, Options>
): typeof fn => (payload, path, options) => {
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
};
