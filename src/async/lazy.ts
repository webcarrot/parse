import type {
  ParseFunctionOptions,
  AsyncParserFunction,
  AsyncParser,
} from "../types";
import make from "./make";

const makeLazy = <
  Output,
  Payload,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
>(
  creator: () => AsyncParserFunction<Output, Payload, Options>
): AsyncParserFunction<Output, Payload, Options> => {
  let instance: AsyncParserFunction<Output, Payload, Options>;
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
  creator: () => AsyncParserFunction<Output, Payload, Options>,
  options?: Options
): AsyncParser<Output, Payload, Options> =>
  make<Output, Payload, Options>(makeLazy(creator), options);
