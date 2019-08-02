import make from "./make";
import { error } from "../utils";
export const handleOnOf = (payload, path, types) => types
    .reduce((out, type) => out.catch(() => type(payload, path)), Promise.reject())
    .catch(() => {
    throw error("One of", path, payload);
});
export const makeOnOf = (types) => (payload, _, path) => handleOnOf(payload, path, types);
export default (types, optional, nullable, convert, defaultValue) => make(makeOnOf(types), optional, nullable, convert, defaultValue);
//# sourceMappingURL=oneOf.js.map