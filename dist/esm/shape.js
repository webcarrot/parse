import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const isPlainObject = (e) => e !== null && typeof e === "object" && e.constructor === Object;
export const handleShape = (payload, data) => {
    if (!isPlainObject(payload)) {
        throw new Error(ERR_INVALID_VALUE);
    }
    const out = {};
    for (let i in data) {
        const v = data[i](payload[i]);
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
export const makeShape = (data) => (payload) => handleShape(payload, data);
export const shape = (data) => make(makeShape(data));
//# sourceMappingURL=shape.js.map