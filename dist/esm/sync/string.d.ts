import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
declare type StringParseFunctionOptions = ParseFunctionOptions<string> & {
    minLength?: number;
    maxLength?: number;
    regexp?: RegExp;
};
declare const _default: (options?: StringParseFunctionOptions) => import("./types").Parser<string, any, ParseFunctionOptions<string>, ParserFunction<string, any, ParseFunctionOptions<string>>>;
export default _default;
