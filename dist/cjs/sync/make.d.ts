import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
declare const make: <Output, Payload = any, Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>, PF extends ParserFunction<Output, Payload, Options> = ParserFunction<Output, Payload, Options>>(fn: PF, options?: Options) => Parser<Output, any, ParseFunctionOptions<Output>, ParserFunction<Output, any, ParseFunctionOptions<Output>>>;
export default make;
