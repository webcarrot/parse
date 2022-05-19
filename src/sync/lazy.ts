import type { ParseFunctionOptions, ParserFunction } from "../types";
import make from "./make";
import { Parser } from "./types";

const makeLazy = <
  Output,
  Payload,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
>(
  creator: () => ParserFunction<Output, Payload, Options>
): ParserFunction<Output, Payload, Options> => {
  let instance: ParserFunction<Output, Payload, Options>;
  return (payload, path, options) => {
    if (!instance) {
      instance = creator();
    }
    return instance(payload, path, options);
  };
};

export default <
  Output,
  Payload extends any = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
>(
  creator: () => ParserFunction<Output, Payload, Options>,
  options?: Options
): Parser<Output, Payload, Options> =>
  make<Output, Payload, Options>(makeLazy(creator), options);
