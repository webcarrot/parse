export * from "./async/types";
export * from "./sync/types";

export type ParseFunctionOptions<Output> = {
  nullable?: boolean;
  optional?: boolean;
  convert?: boolean;
  default?: Output;
};
