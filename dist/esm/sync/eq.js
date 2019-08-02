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
const makeEq = (value) => {
    return (payload, _, path) => {
        const U = handleEq(payload, path, value);
        return U;
    };
};
export default (value, optional, nullable, convert, defaultValue) => make(makeEq(value), optional, nullable, convert, defaultValue);
//# sourceMappingURL=eq.js.map