"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleString = function (payload, convert) {
    if (!convert && typeof payload !== "string") {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
    return (payload || "").toString();
};
exports.string = function (optional, nullable, convert, defaultValue) { return make_1.make(exports.handleString, optional, nullable, convert, defaultValue); };
//# sourceMappingURL=string.js.map