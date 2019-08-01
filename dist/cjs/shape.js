"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
exports.handleShape = function (payload, data) {
    if (!exports.isPlainObject(payload)) {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
    var out = {};
    for (var i in data) {
        var v = data[i](payload[i]);
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
exports.makeShape = function (data) { return function (payload) {
    return exports.handleShape(payload, data);
}; };
exports.shape = function (data) { return make_1.make(exports.makeShape(data)); };
//# sourceMappingURL=shape.js.map