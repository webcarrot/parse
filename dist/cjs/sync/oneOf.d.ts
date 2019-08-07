import { ParseFunctionOptions } from "../types";
import { Parser } from "./types";
declare function onOff<V>(types: Parser<V>[], options?: ParseFunctionOptions<V>): Parser<V>;
export default onOff;
