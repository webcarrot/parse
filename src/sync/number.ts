import { ParserFunction } from "./types";
import make from "./make";
import { error } from "../utils";

export const handleNumber: ParserFunction<number> = (
  payload,
  convert,
  path
) => {
  if (typeof payload === "number") {
    return payload;
  } else if (
    convert &&
    typeof payload === "string" &&
    /^-?\d+(\.\d+)?$/.test(payload)
  ) {
    return parseFloat(payload);
  } else {
    throw error("Number", path, payload);
  }
};

export default (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: number
) => make(handleNumber, optional, nullable, convert, defaultValue);
