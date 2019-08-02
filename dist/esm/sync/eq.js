import make from "./make";
import { error } from "../utils";
const handleEq = (payload, path, value) => {
    if (payload === value) {
        return value;
    }
    else {
        throw error(value, path, payload);
    }
};
const makeEq = (value) => (payload, _, path) => handleEq(payload, path, value);
export default (value, optional, nullable, convert, defaultValue) => make(makeEq(value), optional, nullable, convert, defaultValue);
//# sourceMappingURL=eq.js.map