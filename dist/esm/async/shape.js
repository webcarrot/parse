import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";
export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
const handleShape = (payload, path, data, keys) => {
    if (!isPlainObject(payload)) {
        return Promise.reject(error("Object", path, payload));
    }
    return keys.reduce((p, key) => p.then(out => {
        try {
            const value = data[key](payload[key], makePath(path, key));
            if (value instanceof Promise) {
                return value.then(value => {
                    if (value !== undefined) {
                        out[key] = value;
                    }
                    return out;
                });
            }
            else {
                if (value !== undefined) {
                    out[key] = value;
                }
                return Promise.resolve(out);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }), Promise.resolve({}));
};
const makeShape = (data) => (payload, path) => handleShape(payload, path, data, Object.keys(data));
function shape(data, options) {
    return make(basic(makeShape(data)), options);
}
export default shape;
//# sourceMappingURL=shape.js.map