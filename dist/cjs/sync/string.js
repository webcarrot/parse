"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleString = function (payload, path, options) {
    if (!options.convert && typeof payload !== "string") {
        throw error_1.default("Expected string value", path, payload);
    }
    var value = "" + payload;
    if (options.minLength !== undefined && value.length < options.minLength) {
        throw error_1.default("Expected string longer than " + options.minLength, path, payload);
    }
    if (options.maxLength !== undefined && value.length > options.maxLength) {
        throw error_1.default("Expected string shorter than " + options.maxLength, path, payload);
    }
    if (options.regexp && !options.regexp.test(value)) {
        throw error_1.default("String not match " + options.regexp, path, payload);
    }
    return value;
};
exports.default = (function (options) {
    return make_1.default(basic_1.default(handleString), options);
});
//# sourceMappingURL=string.js.map