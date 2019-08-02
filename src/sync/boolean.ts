import { ParserFunction } from "./types";
import make from "./make";
import { error } from "../utils";

const handleBoolean: ParserFunction<boolean> = (payload, convert, path) => {
  if (!convert && typeof payload !== "boolean") {
    throw error("Boolean", payload, path);
  }
  return !!payload;
};

export default (
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: boolean
) => make(handleBoolean, optional, nullable, convert, defaultValue);
