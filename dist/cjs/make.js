"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.make = function (fn, optional, nullable, convert, defaultValue) {
    if (optional === void 0) { optional = false; }
    if (nullable === void 0) { nullable = false; }
    if (convert === void 0) { convert = false; }
    if (defaultValue === void 0) { defaultValue = undefined; }
    var handler = (function (payload) {
        if (nullable && payload === null) {
            return null;
        }
        if (payload === undefined || payload === null) {
            if (defaultValue) {
                return defaultValue;
            }
            else if (!optional) {
                throw new Error(constants_1.ERR_NO_VALUE);
            }
            else {
                return;
            }
        }
        return fn(payload, convert);
    });
    Object.defineProperties(handler, {
        o: {
            get: function () {
                return exports.make(fn, true, nullable, convert, defaultValue);
            }
        },
        optional: {
            value: function (optional) {
                if (optional === void 0) { optional = true; }
                return exports.make(fn, optional, nullable, convert, defaultValue);
            }
        },
        n: {
            get: function () {
                return exports.make(fn, optional, true, convert, defaultValue);
            }
        },
        nullable: {
            value: function (nullable) {
                if (nullable === void 0) { nullable = true; }
                return exports.make(fn, optional, nullable, convert, defaultValue);
            }
        },
        c: {
            get: function () {
                return exports.make(fn, optional, nullable, true, defaultValue);
            }
        },
        convert: {
            value: function (convert) {
                if (convert === void 0) { convert = true; }
                return exports.make(fn, optional, nullable, convert, defaultValue);
            }
        },
        d: {
            value: function (defaultValue) {
                return exports.make(fn, optional, nullable, convert, defaultValue);
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map