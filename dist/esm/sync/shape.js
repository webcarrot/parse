import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";
const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
const handleShape = (payload, path, data) => {
    if (!isPlainObject(payload)) {
        throw error("Object", path, payload);
    }
    const out = {};
    for (let i in data) {
        const v = data[i](payload[i], makePath(path, i));
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
const makeShape = (data) => (payload, path) => handleShape(payload, path, data);
export default (data, options) => make(basic(makeShape(data)), options);
//# sourceMappingURL=shape.js.map