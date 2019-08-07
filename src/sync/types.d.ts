export type ParserFunction<
  Output,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>
> = (payload: Payload, path: string, options: Options) => Output;

export type ParseFunctionOptions<Output> = {
  nullable?: boolean;
  optional?: boolean;
  convert?: boolean;
  default?: Output;
};

export type MakeParserOut<
  Output = any,
  Payload = any,
  Options extends ParseFunctionOptions<Output> = ParseFunctionOptions<Output>,
  Fn = ParserFunction<Output, Payload, Options>
> = {
  (payload: Payload, path?: string): Output;
  /** Handle success */
  then<FSuccess extends MakeParserOut<any, Output>>(
    onSuccess: FSuccess
  ): FSuccess;
  /** Handle error  */
  catch<FError extends MakeParserOut<any, Payload>>(onError: FError): FError;
  /** Handle finnaly */
  finally<FFinally extends MakeParserOut<any, Output | Payload>>(
    onFinally: FFinally
  ): FFinally;
};
