import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser } from "./types";
declare function onOff<V>(types: Array<Parser<V> | AsyncParser<V>>, options?: ParseFunctionOptions<V>): AsyncParser<V>;
export default onOff;
