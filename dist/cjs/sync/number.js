"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleNumber = function (payload, path, options) {
    var value;
    if (typeof payload === "number") {
        value = payload;
    }
    else if (options.convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        value = parseFloat(payload);
    }
    else {
        throw error_1.default("Expected numeric value", path, payload);
    }
    if (options.min !== undefined && options.min > value) {
        throw error_1.default("Expected number greater than " + options.min, path, payload);
    }
    if (options.max !== undefined && options.max < value) {
        throw error_1.default("Expected number lower than " + options.min, path, payload);
    }
    return value;
};
exports.default = (function (options) {
    return make_1.default(basic_1.default(handleNumber), options);
});
//# sourceMappingURL=number.js.map