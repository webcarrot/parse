import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleArray = (payload, type) => {
    if (payload instanceof Array) {
        return payload.map(v => type(v));
    }
    else {
        throw new Error(ERR_INVALID_VALUE);
    }
};
export const makeArray = (type) => (payload) => handleArray(payload, type);
export const array = (type) => make(makeArray(type));
//# sourceMappingURL=array.js.map