export type ParserFunction<T, P = any> = (
  payload: P,
  convert: boolean,
  path: string
) => T;

// TODO: Try to improve this types

export type MakeParserOut<T = any, P = any, Fn = ParserFunction<T, P>> = {
  (payload: any, path?: string): T;
  /** Make it optional */
  o: MakeParserOut<T | void>;
  /** Set optional flag */
  optional(optional?: boolean): MakeParserOut<T>;
  /** Make it nullable */
  n: MakeParserOut<T | void>;
  /** Set nullable flag */
  nullable(nullable?: boolean): MakeParserOut<T>;
  /** Enable conversion */
  c: MakeParserOut<T>;
  /** Set conversion flag */
  convert(convert?: boolean): MakeParserOut<T>;
  /** Set default value */
  d(v?: T): MakeParserOut<T>;
  /** Handle success */
  then<FSuccess extends ParserFunction<any, T>>(
    onSuccess: FSuccess
  ): MakeParserOut<ReturnType<FSuccess>>;
  /** Handle error  */
  catch<FError extends ParserFunction<any, P>>(
    onError: FError
  ): MakeParserOut<ReturnType<FError> | T>;
};
