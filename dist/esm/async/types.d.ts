import { Parser, ParserFunction } from "../sync/types";
import { ParseFunctionOptions } from "../types";

export type AsyncUnpacked<T> = T extends Promise<infer U> ? U : T;
export type AsyncReturnType<T extends (...args: any) => any> = AsyncUnpacked<
  ReturnType<T>
>;

export type AsyncParserFunction<
  Output,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
> = (payload: Payload, path: string, options: Options) => Promise<Output>;

export type AsyncParser<
  Output = any,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>,
  Fn = ParserFunction<Output, Payload, Options>
> = {
  (payload: Payload, path?: string): Promise<Output>;
  /** Handle success */
  then<FSuccess extends Parser<any, Output> | AsyncParser<any, Output>>(
    onSuccess: FSuccess
  ): FSuccess;
  /** Handle error  */
  catch<FError extends Parser<any, Payload> | AsyncParser<any, Payload>>(
    onError: FError
  ): FError;
  /** Handle finnaly */
  finally<
    FFinally extends
      | Parser<any, Output | Payload>
      | AsyncParser<any, Output | Payload>
  >(
    onFinally: FFinally
  ): FFinally;
};
