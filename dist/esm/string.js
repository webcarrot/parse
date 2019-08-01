import { make } from "./make";
import { ERR_INVALID_VALUE } from "./constants";
export const handleString = (payload, convert) => {
    if (!convert && typeof payload !== "string") {
        throw new Error(ERR_INVALID_VALUE);
    }
    return (payload || "").toString();
};
export const string = () => make(handleString);
//# sourceMappingURL=string.js.map