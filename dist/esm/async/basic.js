import error from "../utils/error";
export default (fn) => (payload, path, options) => {
    if (options.nullable && payload === null) {
        return Promise.resolve(null);
    }
    if (payload === undefined || payload === null) {
        if ("default" in options) {
            return Promise.resolve(options.default);
        }
        else if (!options.optional) {
            throw Promise.reject(error("Required", path, payload));
        }
        else {
            return Promise.resolve();
        }
    }
    return fn(payload, path, options);
};
//# sourceMappingURL=basic.js.map