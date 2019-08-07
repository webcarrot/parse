import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleString = (payload, path, options) => {
    if (!options.convert && typeof payload !== "string") {
        throw error("string", path, payload);
    }
    return `${payload}`;
};
export default (options) => make(basic(handleString), options);
//# sourceMappingURL=string.js.map