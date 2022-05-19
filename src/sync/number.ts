import type { ParseFunctionOptions, ParserFunction } from "../types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

type NumberParseFunctionOptions = ParseFunctionOptions<number> & {
  min?: number;
  max?: number;
};

const handleNumber: ParserFunction<number, any, NumberParseFunctionOptions> = (
  payload,
  path,
  options
) => {
  let value: number;
  if (typeof payload === "number") {
    value = payload;
  } else if (
    options.convert &&
    typeof payload === "string" &&
    /^-?\d+(\.\d+)?$/.test(payload)
  ) {
    value = parseFloat(payload);
  }
  if (isNaN(value)) {
    throw error("Expected numeric value", path, payload);
  }
  if (options.min !== undefined && options.min > value) {
    throw error(`Expected number greater than ${options.min}`, path, payload);
  }
  if (options.max !== undefined && options.max < value) {
    throw error(`Expected number lower than ${options.min}`, path, payload);
  }
  return value;
};

export default (options?: NumberParseFunctionOptions) =>
  make<number>(basic(handleNumber), options);
