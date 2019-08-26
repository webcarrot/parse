import make from "./make";
import basic from "./basic";
import error from "../utils/error";
const handleString = (payload, path, options) => {
    if (!options.convert && typeof payload !== "string") {
        throw error("Expected string value", path, payload);
    }
    const value = `${payload}`;
    if (options.minLength !== undefined && value.length < options.minLength) {
        throw error(`Expected string longer than ${options.minLength}`, path, payload);
    }
    if (options.maxLength !== undefined && value.length > options.maxLength) {
        throw error(`Expected string shorter than ${options.maxLength}`, path, payload);
    }
    if (options.regexp && !options.regexp.test(value)) {
        throw error(`String not match ${options.regexp}`, path, payload);
    }
    return value;
};
export default (options) => make(basic(handleString), options);
//# sourceMappingURL=string.js.map