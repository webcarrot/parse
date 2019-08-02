import make from "./make";
import { error } from "../utils";
export const handleOnOf = (payload, path, types) => {
    for (let i in types) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw error("One of", path, payload);
};
export const makeOnOf = (types) => (payload, _, path) => handleOnOf(payload, path, types);
export default (types, optional, nullable, convert, defaultValue) => make(makeOnOf(types), optional, nullable, convert, defaultValue);
//# sourceMappingURL=oneOf.js.map