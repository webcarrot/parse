import { ParseFunctionOptions } from "../types";
import { Parser } from "./types";

export default function<V>(
  types: Parser<V>[],
  options?: ParseFunctionOptions<V>
): Parser<V>;
export default function<V, T extends Parser<V>>(
  types: T[],
  options?: ParseFunctionOptions<ReturnType<T>>
): Parser<ReturnType<T>>;
