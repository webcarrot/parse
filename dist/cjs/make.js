"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
exports.make = function (fn) {
    var required = false;
    var nullable = false;
    var convert = false;
    var defaultValue;
    var handler = (function (payload) {
        if (nullable && payload === null) {
            return null;
        }
        if (payload === undefined || payload === null) {
            if (defaultValue) {
                return defaultValue;
            }
            else if (required) {
                throw new Error(constants_1.ERR_NO_VALUE);
            }
            else {
                return;
            }
        }
        return fn(payload, convert);
    });
    Object.defineProperties(handler, {
        r: {
            get: function () {
                required = true;
                return handler;
            }
        },
        n: {
            get: function () {
                nullable = true;
                return handler;
            }
        },
        c: {
            get: function () {
                convert = true;
                return handler;
            }
        },
        d: {
            value: function (defaultValue) {
                defaultValue = defaultValue;
                return handler;
            }
        }
    });
    return handler;
};
//# sourceMappingURL=make.js.map