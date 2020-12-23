import { ParseFunctionOptions } from "../types";

export type ParserFunction<
  Output,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
> = (payload: Payload, path: string, options: Options) => Output;

export type Parser<
  Output = any,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>,
  // @ts-ignore
  Fn = ParserFunction<Output, Payload, Options>
> = {
  (payload: Payload, path?: string): Output;
  /** Handle success */
  then<FSuccess extends Parser<any, Output>>(onSuccess: FSuccess): FSuccess;
  /** Handle error  */
  catch<FError extends Parser<any, Payload>>(onError: FError): FError;
  /** Handle finnaly */
  finally<FFinally extends Parser<any, Output | Payload>>(
    onFinally: FFinally
  ): FFinally;
};
