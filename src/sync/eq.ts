import make from "./make";
import { error } from "../utils";

const handleEq = <T>(payload: any, path: string, value: T) => {
  if (payload === value) {
    return value;
  } else {
    throw error(value, path, payload);
  }
};

const makeEq = <T>(value: T) => {
  return (payload: any, _: boolean, path: string) => {
    const U = handleEq(payload, path, value);
    return U as typeof U;
  };
};

export default <T>(
  value: T,
  optional?: boolean,
  nullable?: boolean,
  convert?: boolean,
  defaultValue?: T
) => make(makeEq(value), optional, nullable, convert, defaultValue);
