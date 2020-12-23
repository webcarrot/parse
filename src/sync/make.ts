import type { ParseFunctionOptions, ParserFunction, Parser } from "../types";

const make = <
  Output,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>,
  PF extends ParserFunction<Output, Payload, Options> = ParserFunction<
    Output,
    Payload,
    Options
  >
>(
  fn: PF,
  options: Options = {} as Options
): Parser<Output> => {
  const handler = ((payload: any, path: string = "") =>
    fn(payload, path, options)) as Parser<Output, Payload, Options>;
  handler.then = (onSuccess) =>
    make((payload, path) =>
      onSuccess(fn(payload, path, options), path)
    ) as typeof onSuccess;
  handler.catch = (onError) =>
    make((payload, path) => {
      try {
        return fn(payload, path, options);
      } catch (_) {
        return onError(payload, path);
      }
    }) as typeof onError;
  handler.finally = (onFinnaly) =>
    make((payload, path) => {
      try {
        return onFinnaly(fn(payload, path, options), path);
      } catch (_) {
        return onFinnaly(payload, path);
      }
    }) as typeof onFinnaly;
  return handler;
};

export default make;
