export type ParserFunction<T> = (payload: any, convert: boolean) => T;

// TODO: Improve this types

export type MakeParserOut<Fn extends ParserFunction<any>> = {
  (payload: any): ReturnType<Fn>;
  /** Make it optional */
  o: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Set optional flag */
  optional: (optional?: boolean) => MakeParserOut<Fn>;
  /** Make it nullable */
  n: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Set nullable flag */
  nullable: (nullable?: boolean) => MakeParserOut<Fn>;
  /** Enable conversion */
  c: MakeParserOut<Fn>;
  /** Set conversion flag */
  convert: (convert?: boolean) => MakeParserOut<Fn>;
  /** Set default value */
  d: (v?: ReturnType<Fn>) => MakeParserOut<Fn>;
};
