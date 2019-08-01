import { ERR_NO_VALUE } from "./constants";
export const make = (fn) => {
    let required = false;
    let nullable = false;
    let convert = false;
    let defaultValue;
    const handler = ((payload) => {
        if (nullable && payload === null) {
            return null;
        }
        if (payload === undefined || payload === null) {
            if (defaultValue) {
                return defaultValue;
            }
            else if (required) {
                throw new Error(ERR_NO_VALUE);
            }
            else {
                return;
            }
        }
        return fn(payload, convert);
    });
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
            value: (defaultValue) => {
                defaultValue = defaultValue;
                return handler;
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map