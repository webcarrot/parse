import { ParseFunctionOptions } from "../types";
import { AsyncParserFunction, AsyncParser } from "./types";
declare const make: <Output, Payload = any, Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>, PF extends AsyncParserFunction<Output, Payload, Options> = AsyncParserFunction<Output, Payload, Options>>(fn: PF, options?: Options) => AsyncParser<Output, any, ParseFunctionOptions<Output>, import("..").ParserFunction<Output, any, ParseFunctionOptions<Output>>>;
export default make;
