import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleOneOf = (payload, path, types) => types
    .reduce((out, type) => out.catch(() => type(payload, path)), Promise.reject())
    .catch(() => {
    throw error("One of", path, payload);
});
const makeOneOf = (types) => (payload, path) => handleOneOf(payload, path, types);
function onOff(types, options) {
    return make(basic(makeOneOf(types)), options);
}
export default onOff;
//# sourceMappingURL=oneOf.js.map