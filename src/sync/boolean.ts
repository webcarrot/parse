import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleBoolean: ParserFunction<boolean> = (payload, path, options) => {
  if (!options.convert && typeof payload !== "boolean") {
    throw error("Expected boolean value", payload, path);
  }
  return !!payload;
};

export default (options?: ParseFunctionOptions<boolean>) =>
  make<boolean>(basic(handleBoolean), options);
