import make from "./make";
import { error } from "../utils";
export const handleOneOf = (payload, path, types) => {
    for (let i in types) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw error("One of", path, payload);
};
export const makeOneOf = (types) => (payload, _, path) => handleOneOf(payload, path, types);
export default (types, optional, nullable, convert, defaultValue) => make(makeOneOf(types), optional, nullable, convert, defaultValue);
//# sourceMappingURL=oneOf.js.map