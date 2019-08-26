import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleOneOf = (payload, path, types) => types
    .reduce((out, type) => out.catch(() => type(payload, path)), Promise.reject())
    .catch(() => {
    throw error("Value not match", path, payload);
});
const makeOneOf = (types) => (payload, path) => handleOneOf(payload, path, types);
export default function (types, options) {
    return make(basic(makeOneOf(types)), options);
}
//# sourceMappingURL=oneOf.js.map