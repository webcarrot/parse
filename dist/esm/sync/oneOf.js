import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleOneOf = (payload, path, types) => {
    for (let i = 0; i < types.length; i++) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw error("One of", path, payload);
};
const makeOneOf = (types) => (payload, path) => handleOneOf(payload, path, types);
export default (types, options) => make(basic(makeOneOf(types)), options);
//# sourceMappingURL=oneOf.js.map