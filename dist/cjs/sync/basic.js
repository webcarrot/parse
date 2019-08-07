"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("../utils/error");
exports.default = (function (fn) { return function (payload, path, options) {
    if (options.nullable && payload === null) {
        return null;
    }
    if (payload === undefined || payload === null) {
        if ("default" in options) {
            return options.default;
        }
        else if (!options.optional) {
            throw error_1.default("Required", path, payload);
        }
        else {
            return;
        }
    }
    return fn(payload, path, options);
}; });
//# sourceMappingURL=basic.js.map