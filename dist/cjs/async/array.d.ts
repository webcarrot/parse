import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser } from "./types";
declare const _default: <T>(type: Parser<T, any, ParseFunctionOptions<T>, import("../types").ParserFunction<T, any, ParseFunctionOptions<T>>> | AsyncParser<T, any, ParseFunctionOptions<T>, import("../types").ParserFunction<T, any, ParseFunctionOptions<T>>>, options?: ParseFunctionOptions<T[]>) => AsyncParser<T[], any, ParseFunctionOptions<T[]>, import("../types").ParserFunction<T[], any, ParseFunctionOptions<T[]>>>;
export default _default;
