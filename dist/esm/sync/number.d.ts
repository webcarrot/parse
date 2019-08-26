import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
declare type NumberParseFunctionOptions = ParseFunctionOptions<number> & {
    min?: number;
    max?: number;
};
declare const _default: (options?: NumberParseFunctionOptions) => import("./types").Parser<number, any, ParseFunctionOptions<number>, ParserFunction<number, any, ParseFunctionOptions<number>>>;
export default _default;
