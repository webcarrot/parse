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
exports.eq = function (value) {
    return make_1.make(exports.makeEq(value));
};
//# sourceMappingURL=eq.js.map