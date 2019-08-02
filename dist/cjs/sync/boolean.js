"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
var handleBoolean = function (payload, convert, path) {
    if (!convert && typeof payload !== "boolean") {
        throw utils_1.error("Boolean", payload, path);
    }
    return !!payload;
};
exports.default = (function (optional, nullable, convert, defaultValue) { return make_1.default(handleBoolean, optional, nullable, convert, defaultValue); });
//# sourceMappingURL=boolean.js.map