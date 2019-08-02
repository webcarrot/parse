import make from "./make";
import { error } from "../utils";
const handleBoolean = (payload, convert, path) => {
    if (!convert && typeof payload !== "boolean") {
        throw error("Boolean", payload, path);
    }
    return !!payload;
};
export default (optional, nullable, convert, defaultValue) => make(handleBoolean, optional, nullable, convert, defaultValue);
//# sourceMappingURL=boolean.js.map