import { ParserFunction } from "./types";
import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";

export const handleString: ParserFunction<string> = (payload, convert) => {
  if (!convert && typeof payload !== "string") {
    throw new Error(ERR_INVALID_VALUE);
  }
  return (payload || "").toString();
};

export const string = (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: string
) => make(handleString, optional, nullable, convert, defaultValue);
