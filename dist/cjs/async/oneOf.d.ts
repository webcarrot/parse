import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser } from "./types";
declare const _default: <T extends Parser<any, any, ParseFunctionOptions<any>, import("../sync/types").ParserFunction<any, any, ParseFunctionOptions<any>>> | AsyncParser<any, any, ParseFunctionOptions<any>, import("../sync/types").ParserFunction<any, any, ParseFunctionOptions<any>>>>(types: T[], options?: ParseFunctionOptions<import("./types").AsyncUnpacked<ReturnType<T>>>) => AsyncParser<import("./types").AsyncUnpacked<ReturnType<T>>, any, ParseFunctionOptions<import("./types").AsyncUnpacked<ReturnType<T>>>, import("../sync/types").ParserFunction<import("./types").AsyncUnpacked<ReturnType<T>>, any, ParseFunctionOptions<import("./types").AsyncUnpacked<ReturnType<T>>>>>;
export default _default;
