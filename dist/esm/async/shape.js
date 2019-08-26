import make from "./make";
import basic from "./basic";
import { error, isPlainObject, makePath } from "../utils";
const handleShape = (payload, path, data, keys) => {
    if (!isPlainObject(payload)) {
        return Promise.reject(error("Value is not an plain object", path, payload));
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
export default function (data, options) {
    return make(basic(makeShape(data)), options);
}
//# sourceMappingURL=shape.js.map