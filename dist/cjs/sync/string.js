"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.handleString = function (payload, convert, path) {
    if (!convert && typeof payload !== "string") {
        throw utils_1.error("string", path, payload);
    }
    return "" + payload;
};
exports.default = (function (optional, nullable, convert, defaultValue) { return make_1.default(exports.handleString, optional, nullable, convert, defaultValue); });
//# sourceMappingURL=string.js.map