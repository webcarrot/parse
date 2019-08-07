import { ParseFunctionOptions } from "../types";
import { AsyncParserFunction } from "./types";
declare const _default: <Output, Payload extends any, Options extends ParseFunctionOptions<Output>>(fn: AsyncParserFunction<Output, Payload, Options>) => AsyncParserFunction<Output, Payload, Options>;
export default _default;
