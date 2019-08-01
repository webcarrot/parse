import { ParserFunction } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleBoolean: ParserFunction<boolean> = (payload, convert) => {
  if (!convert && typeof payload !== "boolean") {
    throw new Error(ERR_INVALID_VALUE);
  }
  return !!payload;
};

export const boolean = (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: boolean
) => make(handleBoolean, optional, nullable, convert, defaultValue);
