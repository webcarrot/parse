import { ParserFunction, ParseFunctionOptions } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

export const handleString: ParserFunction<string> = (
  payload,
  path,
  options
) => {
  if (!options.convert && typeof payload !== "string") {
    throw error("string", path, payload);
  }
  return `${payload}`;
};

export default (options?: ParseFunctionOptions<string>) =>
  make(basic(handleString), options);
