import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleNumber = (payload, convert) => {
    if (typeof payload === "number") {
        return payload;
    }
    else if (convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw new Error(ERR_INVALID_VALUE);
    }
};
export const number = (optional, nullable, convert, defaultValue) => make(handleNumber, optional, nullable, convert, defaultValue);
//# sourceMappingURL=number.js.map