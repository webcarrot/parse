import { ParserFunction } from "./types";
import make from "./make";
import { error } from "../utils";

export const handleString: ParserFunction<string> = (
  payload,
  convert,
  path
) => {
  if (!convert && typeof payload !== "string") {
    throw error("string", path, payload);
  }
  return `${payload}`;
};

export default (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: string
) => make(handleString, optional, nullable, convert, defaultValue);
