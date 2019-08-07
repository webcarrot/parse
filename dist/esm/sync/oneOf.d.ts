import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
declare const _default: <T extends Parser<any, any, ParseFunctionOptions<any>, ParserFunction<any, any, ParseFunctionOptions<any>>>>(types: T[], options?: ParseFunctionOptions<ReturnType<T>>) => Parser<ReturnType<T>, any, ParseFunctionOptions<ReturnType<T>>, ParserFunction<ReturnType<T>, any, ParseFunctionOptions<ReturnType<T>>>>;
export default _default;
