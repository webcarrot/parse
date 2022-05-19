import type { ParseFunctionOptions, ParserFunction, Parser } from "../types";
import make from "./make";
import basic from "./basic";
import error from "../utils/error";

const handleSwitch = <V, T extends Parser<V>, K extends keyof V>(
  payload: any,
  path: string,
  key: K,
  map: { readonly [k in Extract<V[K], string | number>]: T }
): V => {
  if (payload && key in payload) {
    const keyValue = `${payload[key]}` as Extract<V[K], string | number>;
    const parser = map[keyValue];
    if (parser && parser instanceof Function && map.hasOwnProperty(keyValue)) {
      return parser(payload, path);
    }
  }
  throw error("Value not match", path, payload);
};

const makeSwitch =
  <V, T extends Parser<V>, K extends keyof V>(
    key: K,
    map: { readonly [k in Extract<V[K], string | number>]: T }
  ): ParserFunction<V> =>
  (payload, path) =>
    handleSwitch(payload, path, key, map);

export default function <
  K extends string | number,
  VK extends string | number,
  V extends { readonly [k in K]: VK },
  P extends Parser<V>
>(
  key: K,
  map: { readonly [KV in VK]: Parser<{ [k in K]: KV }> },
  options?: ParseFunctionOptions<V>
): Parser<V>;
export default function <V, K extends keyof V>(
  key: K,
  map: {
    readonly [KV in Extract<V[K], string | number>]: Parser<{ [k in K]: KV }>;
  },
  options?: ParseFunctionOptions<V>
): Parser<V>;
export default function (key: any, map: any, options?: any): Parser<any> {
  return make<any>(basic(makeSwitch(key, map)), options);
}
