import { ParseFunctionOptions } from "../types";
import { ParserFunction } from "./types";
declare const _default: <Output, Payload extends any, Options extends ParseFunctionOptions<Output>>(fn: ParserFunction<Output, Payload, Options>) => ParserFunction<Output, Payload, Options>;
export default _default;
