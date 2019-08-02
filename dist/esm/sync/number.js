import make from "./make";
import { error } from "../utils";
export const handleNumber = (payload, convert, path) => {
    if (typeof payload === "number") {
        return payload;
    }
    else if (convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw error("Number", path, payload);
    }
};
export default (optional, nullable, convert, defaultValue) => make(handleNumber, optional, nullable, convert, defaultValue);
//# sourceMappingURL=number.js.map