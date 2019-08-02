import { ParserFunction, MakeParserOut } from "./types";
import { error } from "../utils";

const make = <T, PF extends ParserFunction<T> = ParserFunction<T>>(
  fn: PF,
  optional: boolean = false,
  nullable: boolean = false,
  convert: boolean = false,
  defaultValue: T = undefined,
  wrap: boolean = true
): MakeParserOut<T> => {
  const fWrap: typeof fn = wrap
    ? (((payload, _, path) => {
        if (nullable && payload === null) {
          return null;
        }
        if (payload === undefined || payload === null) {
          if (defaultValue !== undefined) {
            return defaultValue;
          } else if (!optional) {
            throw error("Required", path, payload);
          } else {
            return;
          }
        }
        return fn(payload, convert, path);
      }) as typeof fn)
    : fn;
  const handler = ((payload: any, path: string = "") =>
    fWrap(payload, convert, path)) as MakeParserOut<T>;
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
      value: <FSuccess extends ParserFunction<any, T>>(onSuccess: FSuccess) => {
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
      value: <FError extends ParserFunction<any, T>>(onError: FError) => {
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
