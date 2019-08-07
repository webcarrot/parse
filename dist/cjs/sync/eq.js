"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleEq = function (payload, path, value) {
    if (payload === value) {
        return value;
    }
    else {
        throw error_1.default(value, path, payload);
    }
};
var makeEq = function (value) { return function (payload, path) {
    return handleEq(payload, path, value);
}; };
exports.default = (function (value, options) {
    return make_1.default(basic_1.default(makeEq(value)), options);
});
//# sourceMappingURL=eq.js.map