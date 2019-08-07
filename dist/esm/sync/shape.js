import make from "./make";
import basic from "./basic";
import { error, isPlainObject, makePath } from "../utils";
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
export default function (data, options) {
    return make(basic(makeShape(data)), options);
}
//# sourceMappingURL=shape.js.map