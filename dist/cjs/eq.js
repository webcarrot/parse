"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleEq = function (payload, value) {
    if (payload === value) {
        return value;
    }
    else {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
};
exports.makeEq = function (value) { return function (payload) {
    return exports.handleEq(payload, value);
}; };
exports.eq = function (value, optional, nullable, convert, defaultValue) {
    return make_1.make(exports.makeEq(value), optional, nullable, convert, defaultValue);
};
//# sourceMappingURL=eq.js.map