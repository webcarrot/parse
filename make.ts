import { ParserFunction, MakeParserOut } from "./types";
import { ERR_NO_VALUE } from "./constants";

export const make = <PF extends ParserFunction<any>>(
  fn: PF,
  optional: boolean = false,
  nullable: boolean = false,
  convert: boolean = false,
  defaultValue: ReturnType<PF> = undefined
): MakeParserOut<typeof fn> => {
  const handler = ((payload: any) => {
    if (nullable && payload === null) {
      return null;
    }
    if (payload === undefined || payload === null) {
      if (defaultValue) {
        return defaultValue;
      } else if (!optional) {
        throw new Error(ERR_NO_VALUE);
      } else {
        return;
      }
    }
    return fn(payload, convert);
  }) as MakeParserOut<typeof fn>;
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
    }
  });
  return handler;
};
