import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleOnOf = (payload, types) => {
    for (let i in types) {
        try {
            return types[i](payload);
        }
        catch (_) { }
    }
    throw new Error(ERR_INVALID_VALUE);
};
export const makeOnOf = (types) => (payload) => handleOnOf(payload, types);
export const oneOf = (types, optional, nullable, convert, defaultValue) => make(makeOnOf(types), optional, nullable, convert, defaultValue);
//# sourceMappingURL=oneOf.js.map