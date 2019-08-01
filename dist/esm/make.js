import { ERR_NO_VALUE } from "./constants";
export const make = (fn, optional = false, nullable = false, convert = false, defaultValue = undefined) => {
    const handler = ((payload) => {
        if (nullable && payload === null) {
            return null;
        }
        if (payload === undefined || payload === null) {
            if (defaultValue) {
                return defaultValue;
            }
            else if (!optional) {
                throw new Error(ERR_NO_VALUE);
            }
            else {
                return;
            }
        }
        return fn(payload, convert);
    });
    Object.defineProperties(handler, {
        o: {
            get() {
                return make(fn, true, nullable, convert, defaultValue);
            }
        },
        optional: {
            value: (optional = true) => {
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        n: {
            get() {
                return make(fn, optional, true, convert, defaultValue);
            }
        },
        nullable: {
            value: (nullable = true) => {
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        c: {
            get() {
                return make(fn, optional, nullable, true, defaultValue);
            }
        },
        convert: {
            value: (convert = true) => {
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        d: {
            value: (defaultValue) => {
                return make(fn, optional, nullable, convert, defaultValue);
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map