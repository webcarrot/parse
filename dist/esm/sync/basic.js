import error from "../utils/error";
export default (fn) => (payload, path, options) => {
    if (options.nullable && payload === null) {
        return null;
    }
    if (payload === undefined || payload === null) {
        if ("default" in options) {
            return options.default;
        }
        else if (!options.optional) {
            throw error("Value is required", path, payload);
        }
        else {
            return;
        }
    }
    return fn(payload, path, options);
};
//# sourceMappingURL=basic.js.map