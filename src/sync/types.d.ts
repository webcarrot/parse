export type ParserFunction<T, P = any> = (
  payload: P,
  convert: boolean,
  path: string
) => T;

// TODO: Try to improve this types

export type MakeParserOut<Fn extends ParserFunction<any>> = {
  (payload: any, path?: string): ReturnType<Fn>;
  /** Make it optional */
  o: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Set optional flag */
  optional(optional?: boolean): MakeParserOut<Fn>;
  /** Make it nullable */
  n: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Set nullable flag */
  nullable(nullable?: boolean): MakeParserOut<Fn>;
  /** Enable conversion */
  c: MakeParserOut<Fn>;
  /** Set conversion flag */
  convert(convert?: boolean): MakeParserOut<Fn>;
  /** Set default value */
  d(v?: ReturnType<Fn>): MakeParserOut<Fn>;
  /** Handle success */
  then<FnS extends ParserFunction<any, ReturnType<Fn>>>(
    onSuccess: FnS
  ): MakeParserOut<FnS>;
  /** Handle error  */
  catch<FnS extends ParserFunction<any>>(onError: FnS): MakeParserOut<FnS | Fn>;
};
