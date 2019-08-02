"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
var handleEq = function (payload, path, value) {
    if (payload === value) {
        return value;
    }
    else {
        throw utils_1.error(value, path, payload);
    }
};
var makeEq = function (value) {
    return function (payload, _, path) {
        var U = handleEq(payload, path, value);
        return U;
    };
};
exports.default = (function (value, optional, nullable, convert, defaultValue) { return make_1.default(makeEq(value), optional, nullable, convert, defaultValue); });
//# sourceMappingURL=eq.js.map