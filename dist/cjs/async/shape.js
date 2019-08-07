"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var utils_1 = require("../utils");
exports.isPlainObject = function (e) {
    return e !== null && typeof e === "object" && e.constructor === Object;
};
var handleShape = function (payload, path, data, keys) {
    if (!exports.isPlainObject(payload)) {
        return Promise.reject(utils_1.error("Object", path, payload));
    }
    return keys.reduce(function (p, key) {
        return p.then(function (out) {
            try {
                var value = data[key](payload[key], utils_1.makePath(path, key));
                if (value instanceof Promise) {
                    return value.then(function (value) {
                        if (value !== undefined) {
                            out[key] = value;
                        }
                        return out;
                    });
                }
                else {
                    if (value !== undefined) {
                        out[key] = value;
                    }
                    return Promise.resolve(out);
                }
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }, Promise.resolve({}));
};
var makeShape = function (data) { return function (payload, path) {
    return handleShape(payload, path, data, Object.keys(data));
}; };
exports.default = (function (data, options) { return make_1.default(basic_1.default(makeShape(data)), options); });
//# sourceMappingURL=shape.js.map