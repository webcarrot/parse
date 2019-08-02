"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
var handleArray = function (payload, path, type) {
    if (payload instanceof Array) {
        return payload.map(function (v, no) { return type(v, utils_1.makePath(path, no)); });
    }
    else {
        throw utils_1.error("Array", path, payload);
    }
};
var makeArray = function (type) { return function (payload, _, path) {
    return handleArray(payload, path, type);
}; };
exports.default = (function (type, optional, nullable, convert, defaultValue) { return make_1.default(makeArray(type), optional, nullable, convert, defaultValue); });
//# sourceMappingURL=array.js.map