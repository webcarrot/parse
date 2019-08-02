import {
  AsyncParserFunction,
  AsyncMakeParserOut,
  AsyncReturnType
} from "./types";
import { error } from "../utils";

const make = <PF extends AsyncParserFunction<any>>(
  fn: PF,
  optional: boolean = false,
  nullable: boolean = false,
  convert: boolean = false,
  defaultValue: AsyncReturnType<PF> = undefined,
  wrap: boolean = true
): AsyncMakeParserOut<typeof fn> => {
  const fWrap: typeof fn = wrap
    ? (((payload, _, path) => {
        if (nullable && payload === null) {
          return Promise.resolve(null);
        }
        if (payload === undefined || payload === null) {
          if (defaultValue !== undefined) {
            return Promise.resolve(defaultValue);
          } else if (!optional) {
            return Promise.reject(error("Any", path, payload));
          } else {
            return Promise.resolve();
          }
        }
        return fn(payload, convert, path);
      }) as typeof fn)
    : fn;
  const handler = ((payload: any, path: string = "") =>
    fWrap(payload, convert, path)) as AsyncMakeParserOut<typeof fn>;
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
      value: <FnS extends AsyncParserFunction<any, AsyncReturnType<typeof fn>>>(
        onSuccess: FnS
      ) => {
        return make(
          (payload: any, convert: boolean, path?: string) =>
            fWrap(payload, convert, path).then(value =>
              onSuccess(value, convert, path)
            ),
          optional,
          nullable,
          convert,
          defaultValue
        );
      }
    },
    catch: {
      value: <FnS extends AsyncParserFunction<any, AsyncReturnType<typeof fn>>>(
        onError: FnS
      ) => {
        return make(
          (payload: any, convert: boolean, path?: string) =>
            fWrap(payload, convert, path).catch(() =>
              onError(payload, convert, path)
            ),
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
