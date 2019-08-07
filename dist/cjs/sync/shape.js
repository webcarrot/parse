"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var utils_1 = require("../utils");
var isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
var handleShape = function (payload, path, data) {
    if (!isPlainObject(payload)) {
        throw utils_1.error("Object", path, payload);
    }
    var out = {};
    for (var i in data) {
        var v = data[i](payload[i], utils_1.makePath(path, i));
        if (v !== undefined) {
            out[i] = v;
        }
    }
    return out;
};
var makeShape = function (data) { return function (payload, path) {
    return handleShape(payload, path, data);
}; };
function shape(data, options) {
    return make_1.default(basic_1.default(makeShape(data)), options);
}
exports.default = shape;
//# sourceMappingURL=shape.js.map