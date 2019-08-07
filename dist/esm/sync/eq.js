import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleEq = (payload, path, value) => {
    if (payload === value) {
        return value;
    }
    else {
        throw error(value, path, payload);
    }
};
const makeEq = (value) => (payload, path) => handleEq(payload, path, value);
export default (value, options) => make(basic(makeEq(value)), options);
//# sourceMappingURL=eq.js.map