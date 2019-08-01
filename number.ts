import { ParserFunction } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleNumber: ParserFunction<number> = (payload, convert) => {
  if (typeof payload === "number") {
    return payload;
  } else if (
    convert &&
    typeof payload === "string" &&
    /^-?\d+(\.\d+)?$/.test(payload)
  ) {
    return parseFloat(payload);
  } else {
    throw new Error(ERR_INVALID_VALUE);
  }
};

export const number = (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: number
) => make(handleNumber, optional, nullable, convert, defaultValue);
