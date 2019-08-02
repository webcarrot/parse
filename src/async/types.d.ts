export type AsyncParserFunction<T, P = any> = (
  payload: P,
  convert: boolean,
  path: string
) => Promise<T>;

export type AsyncUnpacked<T> = T extends Promise<infer U> ? U : T;
export type AsyncReturnType<T extends (...args: any) => any> = AsyncUnpacked<
  ReturnType<T>
>;

// TODO: Try to improve this types

export type AsyncMakeParserOut<Fn extends AsyncParserFunction<any>> = {
  (payload: any, path?: string): AsyncReturnType<Fn>;
  /** Make it optional */
  o: AsyncMakeParserOut<AsyncParserFunction<AsyncReturnType<Fn> | void>>;
  /** Set optional flag */
  optional(optional?: boolean): AsyncMakeParserOut<Fn>;
  /** Make it nullable */
  n: AsyncMakeParserOut<AsyncParserFunction<AsyncReturnType<Fn> | void>>;
  /** Set nullable flag */
  nullable(nullable?: boolean): AsyncMakeParserOut<Fn>;
  /** Enable conversion */
  c: AsyncMakeParserOut<Fn>;
  /** Set conversion flag */
  convert(convert?: boolean): AsyncMakeParserOut<Fn>;
  /** Set default value */
  d(v?: AsyncReturnType<Fn>): AsyncMakeParserOut<Fn>;
  /** Handle success */
  then<FnS extends AsyncParserFunction<any, AsyncReturnType<Fn>>>(
    onSuccess: FnS
  ): AsyncMakeParserOut<FnS>;
  /** Handle error  */
  catch<FnS extends AsyncParserFunction<any>>(
    onError: FnS
  ): AsyncMakeParserOut<FnS | Fn>;
};
