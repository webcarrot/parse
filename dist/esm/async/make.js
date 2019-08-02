import { error } from "../utils";
const make = (fn, optional = false, nullable = false, convert = false, defaultValue = undefined, wrap = true) => {
    const fWrap = wrap
        ? ((payload, _, path) => {
            if (nullable && payload === null) {
                return Promise.resolve(null);
            }
            if (payload === undefined || payload === null) {
                if (defaultValue !== undefined) {
                    return Promise.resolve(defaultValue);
                }
                else if (!optional) {
                    return Promise.reject(error("Required", path, payload));
                }
                else {
                    return Promise.resolve();
                }
            }
            return fn(payload, convert, path);
        })
        : fn;
    const handler = ((payload, path = "") => fWrap(payload, convert, path));
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
        },
        then: {
            value: (onSuccess) => {
                return make((payload, convert, path) => fWrap(payload, convert, path).then(value => onSuccess(value, convert, path)), optional, nullable, convert, defaultValue);
            }
        },
        catch: {
            value: (onError) => {
                return make((payload, convert, path) => fWrap(payload, convert, path).catch(() => onError(payload, convert, path)), optional, nullable, convert, defaultValue, false);
            }
        }
    });
    return handler;
};
export default make;
//# sourceMappingURL=make.js.map