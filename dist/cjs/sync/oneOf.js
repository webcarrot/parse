"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleOneOf = function (payload, path, types) {
    for (var i = 0; i < types.length; i++) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw error_1.default("One of", path, payload);
};
var makeOneOf = function (types) { return function (payload, path) {
    return handleOneOf(payload, path, types);
}; };
exports.default = (function (types, options) { return make_1.default(basic_1.default(makeOneOf(types)), options); });
//# sourceMappingURL=oneOf.js.map