"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var utils_1 = require("../utils");
var handleArray = function (payload, path, type) {
    if (payload instanceof Array) {
        return Promise.all(payload.map(function (v, no) {
            try {
                return type(v, utils_1.makePath(path, no));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }));
    }
    else {
        return Promise.reject(utils_1.error("Array", path, payload));
    }
};
var makeArray = function (type) { return function (payload, path) {
    return handleArray(payload, path, type);
}; };
exports.default = (function (type, options) { return make_1.default(basic_1.default(makeArray(type)), options); });
//# sourceMappingURL=array.js.map