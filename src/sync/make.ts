import { ParserFunction, MakeParserOut } from "./types";
import { error } from "../utils";

const make = <PF extends ParserFunction<any>>(
  fn: PF,
  optional: boolean = false,
  nullable: boolean = false,
  convert: boolean = false,
  defaultValue: ReturnType<PF> = undefined,
  wrap: boolean = true
): MakeParserOut<typeof fn> => {
  const fWrap: typeof fn = wrap
    ? (((payload, _, path) => {
        if (nullable && payload === null) {
          return null;
        }
        if (payload === undefined || payload === null) {
          if (defaultValue !== undefined) {
            return defaultValue;
          } else if (!optional) {
            throw error("Any", path, payload);
          } else {
            return;
          }
        }
        return fn(payload, convert, path);
      }) as typeof fn)
    : fn;
  const handler = ((payload: any, path: string = "") =>
    fWrap(payload, convert, path)) as MakeParserOut<typeof fn>;
  Object.defineProperties(handler, {
    o: {
      get() {
        return make(fn, true, nullable, convert, defaultValue);
      }
    },
    optional: {
      value: (optional: boolean = true) => {
        return make(fn, optional, nullable, convert, defaultValue);
      }
    },
    n: {
      get() {
        return make(fn, optional, true, convert, defaultValue);
      }
    },
    nullable: {
      value: (nullable: boolean = true) => {
        return make(fn, optional, nullable, convert, defaultValue);
      }
    },
    c: {
      get() {
        return make(fn, optional, nullable, true, defaultValue);
      }
    },
    convert: {
      value: (convert: boolean = true) => {
        return make(fn, optional, nullable, convert, defaultValue);
      }
    },
    d: {
      value: (defaultValue?: any) => {
        return make(fn, optional, nullable, convert, defaultValue);
      }
    },
    then: {
      value: <FnS extends ParserFunction<any, ReturnType<typeof fn>>>(
        onSuccess: FnS
      ) => {
        return make(
          (payload: any, convert: boolean, path?: string) =>
            onSuccess(fWrap(payload, convert, path), convert, path),
          optional,
          nullable,
          convert,
          defaultValue
        );
      }
    },
    catch: {
      value: <FnS extends ParserFunction<any, ReturnType<typeof fn>>>(
        onError: FnS
      ) => {
        return make(
          (payload: any, convert: boolean, path?: string) => {
            try {
              return fWrap(payload, convert, path);
            } catch (_) {
              return onError(payload, convert, path);
            }
          },
          optional,
          nullable,
          convert,
          defaultValue,
          false
        );
      }
    }
  });
  return handler;
};

export default make;
