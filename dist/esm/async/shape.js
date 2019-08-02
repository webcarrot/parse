import make from "./make";
import { error, makePath } from "../utils";
export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
export const handleShape = (payload, path, data, keys) => {
    if (!isPlainObject(payload)) {
        return Promise.reject(error("Object", path, payload));
    }
    return Promise.all(keys.map(key => {
        try {
            return data[key](payload[key], makePath(path, key));
        }
        catch (err) {
            return Promise.reject(err);
        }
    })).then(out => out.reduce((out, value, no) => {
        if (value !== undefined) {
            out[keys[no]] = value;
        }
        return out;
    }, {}));
};
export const makeShape = (data, keys) => (payload, _, path) => handleShape(payload, path, data, keys);
export default (data, optional, nullable, convert, defaultValue) => make(makeShape(data, Object.keys(data)), optional, nullable, convert, defaultValue);
//# sourceMappingURL=shape.js.map