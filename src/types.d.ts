export type ParseFunctionOptions<Output> = {
  nullable?: boolean;
  optional?: boolean;
  convert?: boolean;
  default?: Output;
};
