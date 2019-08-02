"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
exports.handleShape = function (payload, path, data) {
    if (!exports.isPlainObject(payload)) {
        throw utils_1.error("Object", path, payload);
    }
    var out = {};
    for (var i in data) {
        var v = data[i](payload[i], path ? path + "." + i : i);
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
exports.makeShape = function (data) { return function (payload, _, path) {
    return exports.handleShape(payload, path, data);
}; };
exports.default = (function (data, optional, nullable, convert, defaultValue) { return make_1.default(exports.makeShape(data), optional, nullable, convert, defaultValue); });
//# sourceMappingURL=shape.js.map