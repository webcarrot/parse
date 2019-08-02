"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
var make = function (fn, optional, nullable, convert, defaultValue, wrap) {
    if (optional === void 0) { optional = false; }
    if (nullable === void 0) { nullable = false; }
    if (convert === void 0) { convert = false; }
    if (defaultValue === void 0) { defaultValue = undefined; }
    if (wrap === void 0) { wrap = true; }
    var fWrap = wrap
        ? (function (payload, _, path) {
            if (nullable && payload === null) {
                return Promise.resolve(null);
            }
            if (payload === undefined || payload === null) {
                if (defaultValue !== undefined) {
                    return Promise.resolve(defaultValue);
                }
                else if (!optional) {
                    return Promise.reject(utils_1.error("Required", path, payload));
                }
                else {
                    return Promise.resolve();
                }
            }
            return fn(payload, convert, path);
        })
        : fn;
    var handler = (function (payload, path) {
        if (path === void 0) { path = ""; }
        return fWrap(payload, convert, path);
    });
    Object.defineProperties(handler, {
        o: {
            get: function () {
                return make(fn, true, nullable, convert, defaultValue);
            }
        },
        optional: {
            value: function (optional) {
                if (optional === void 0) { optional = true; }
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        n: {
            get: function () {
                return make(fn, optional, true, convert, defaultValue);
            }
        },
        nullable: {
            value: function (nullable) {
                if (nullable === void 0) { nullable = true; }
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        c: {
            get: function () {
                return make(fn, optional, nullable, true, defaultValue);
            }
        },
        convert: {
            value: function (convert) {
                if (convert === void 0) { convert = true; }
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        d: {
            value: function (defaultValue) {
                return make(fn, optional, nullable, convert, defaultValue);
            }
        },
        then: {
            value: function (onSuccess) {
                return make(function (payload, convert, path) {
                    return fWrap(payload, convert, path).then(function (value) {
                        return onSuccess(value, convert, path);
                    });
                }, optional, nullable, convert, defaultValue);
            }
        },
        catch: {
            value: function (onError) {
                return make(function (payload, convert, path) {
                    return fWrap(payload, convert, path).catch(function () {
                        return onError(payload, convert, path);
                    });
                }, optional, nullable, convert, defaultValue, false);
            }
        }
    });
    return handler;
};
exports.default = make;
//# sourceMappingURL=make.js.map