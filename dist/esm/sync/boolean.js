import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleBoolean = (payload, path, options) => {
    if (!options.convert && typeof payload !== "boolean") {
        throw error("Expected boolean value", payload, path);
    }
    return !!payload;
};
export default (options) => make(basic(handleBoolean), options);
//# sourceMappingURL=boolean.js.map