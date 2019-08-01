import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleBoolean = (payload, convert) => {
    if (!convert && typeof payload !== "boolean") {
        throw new Error(ERR_INVALID_VALUE);
    }
    return !!payload;
};
export const boolean = () => make(handleBoolean);
//# sourceMappingURL=boolean.js.map