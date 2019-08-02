"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
exports.handleShape = function (payload, path, data, keys) {
    if (!exports.isPlainObject(payload)) {
        return Promise.reject(utils_1.error("Object", path, payload));
    }
    return Promise.all(keys.map(function (key) {
        try {
            return data[key](payload[key], utils_1.makePath(path, key));
        }
        catch (err) {
            return Promise.reject(err);
        }
    })).then(function (out) {
        return out.reduce(function (out, value, no) {
            if (value !== undefined) {
                out[keys[no]] = value;
            }
            return out;
        }, {});
    });
};
exports.makeShape = function (data, keys) { return function (payload, _, path) {
    return exports.handleShape(payload, path, data, keys);
}; };
exports.default = (function (data, optional, nullable, convert, defaultValue) {
    return make_1.default(exports.makeShape(data, Object.keys(data)), optional, nullable, convert, defaultValue);
});
//# sourceMappingURL=shape.js.map