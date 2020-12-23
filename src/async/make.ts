import type {
  ParseFunctionOptions,
  AsyncParserFunction,
  AsyncParser,
} from "../types";

const make = <
  Output,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>,
  PF extends AsyncParserFunction<
    Output,
    Payload,
    Options
  > = AsyncParserFunction<Output, Payload, Options>
>(
  fn: PF,
  options: Options = {} as Options
): AsyncParser<Output> => {
  const handler = ((payload: any, path: string = "") =>
    fn(payload, path, options)) as AsyncParser<Output, Payload, Options>;
  handler.then = (onSuccess) =>
    make((payload, path) =>
      fn(payload, path, options).then((out) => onSuccess(out, path))
    ) as typeof onSuccess;
  handler.catch = (onError) =>
    make((payload, path) =>
      fn(payload, path, options).catch(() => onError(payload, path))
    ) as typeof onError;
  handler.finally = (onFinnaly) =>
    make((payload, path) =>
      fn(payload, path, options).then(
        (output) => onFinnaly(output, path),
        () => onFinnaly(payload, path)
      )
    ) as typeof onFinnaly;
  return handler;
};

export default make;
