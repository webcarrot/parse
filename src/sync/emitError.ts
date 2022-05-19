import type { ParserFunction } from "../types";
import make from "./make";
import error from "../utils/error";

const makeEmitError =
  (value: string): ParserFunction<never> =>
  (payload, path) => {
    throw error(value, path, payload);
  };

export default (value: string) => make<never>(makeEmitError(value));
