import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleEq = (payload, value) => {
    if (payload === value) {
        return value;
    }
    else {
        throw new Error(ERR_INVALID_VALUE);
    }
};
export const makeEq = (value) => (payload) => handleEq(payload, value);
export const eq = (value) => make(makeEq(value));
//# sourceMappingURL=eq.js.map