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
function onOff(types, options) {
    return make(basic(makeOneOf(types)), options);
}
export default onOff;
//# sourceMappingURL=oneOf.js.map