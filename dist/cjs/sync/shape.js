"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var utils_1 = require("../utils");
var handleShape = function (payload, path, data) {
    if (!utils_1.isPlainObject(payload)) {
        throw utils_1.error("Value is not an plain object", path, payload);
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
function default_1(data, options) {
    return make_1.default(basic_1.default(makeShape(data)), options);
}
exports.default = default_1;
//# sourceMappingURL=shape.js.map