export type ParserFunction<T> = (payload: any, convert: boolean) => T;

export type MakeParserOut<Fn extends ParserFunction<any>> = {
  (payload: any): ReturnType<Fn>;
  /** Make it optional */
  o: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Make it nullable */
  n: MakeParserOut<ParserFunction<ReturnType<Fn> | void>>;
  /** Enable conversion */
  c: MakeParserOut<Fn>;
  /** Set default value */
  d: (v?: ReturnType<Fn>) => MakeParserOut<Fn>;
};
