import type { ParserFunction } from "../types";
import make from "./make";

const makeEmitValue = <T>(value: T): ParserFunction<T> => () => value;

export default <T>(value: T) => make<T>(makeEmitValue(value));
