import { ParserFunction, MakeParserOut } from "./types";
import { ERR_NO_VALUE } from "./constants";

export const make = <PF extends ParserFunction<any>>(
  fn: PF
): MakeParserOut<typeof fn> => {
  let required: boolean = false;
  let nullable: boolean = false;
  let convert: boolean = false;
  let defaultValue: any;
  const handler = ((payload: any) => {
    if (nullable && payload === null) {
      return null;
    }
    if (payload === undefined || payload === null) {
      if (defaultValue) {
        return defaultValue;
      } else if (required) {
        throw new Error(ERR_NO_VALUE);
      } else {
        return;
      }
    }
    return fn(payload, convert);
  }) as MakeParserOut<typeof fn>;
  Object.defineProperties(handler, {
    r: {
      get() {
        required = true;
        return handler;
      }
    },
    n: {
      get() {
        nullable = true;
        return handler;
      }
    },
    c: {
      get() {
        convert = true;
        return handler;
      }
    },
    d: {
      value: (defaultValue?: any) => {
        defaultValue = defaultValue;
        return handler;
      }
    }
  });
  return handler;
};
