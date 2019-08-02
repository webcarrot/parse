import make from "./make";
import { error } from "../utils";
export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
export const handleShape = (payload, path, data) => {
    if (!isPlainObject(payload)) {
        throw error("Object", path, payload);
    }
    const out = {};
    for (let i in data) {
        const v = data[i](payload[i], path ? `${path}.${i}` : i);
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
export const makeShape = (data) => (payload, _, path) => handleShape(payload, path, data);
export default (data, optional, nullable, convert, defaultValue) => make(makeShape(data), optional, nullable, convert, defaultValue);
//# sourceMappingURL=shape.js.map