"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../utils/error");
exports.default = (function (fn) { return function (payload, path, options) {
    if (options.nullable && payload === null) {
        return Promise.resolve(null);
    }
    if (payload === undefined || payload === null) {
        if ("default" in options) {
            return Promise.resolve(options.default);
        }
        else if (!options.optional) {
            throw Promise.reject(error_1.default("Value is required", path, payload));
        }
        else {
            return Promise.resolve();
        }
    }
    return fn(payload, path, options);
}; });
//# sourceMappingURL=basic.js.map