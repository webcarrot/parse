import make from "./make";
import { error } from "../utils";
export const handleString = (payload, convert, path) => {
    if (!convert && typeof payload !== "string") {
        throw error("string", path, payload);
    }
    return `${payload}`;
};
export default (optional, nullable, convert, defaultValue) => make(handleString, optional, nullable, convert, defaultValue);
//# sourceMappingURL=string.js.map