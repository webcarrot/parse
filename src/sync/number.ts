import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleNumber: ParserFunction<number> = (payload, path, options) => {
  if (typeof payload === "number") {
    return payload;
  } else if (
    options.convert &&
    typeof payload === "string" &&
    /^-?\d+(\.\d+)?$/.test(payload)
  ) {
    return parseFloat(payload);
  } else {
    throw error("Number", path, payload);
  }
};

export default (options?: ParseFunctionOptions<number>) =>
  make<number>(basic(handleNumber), options);
