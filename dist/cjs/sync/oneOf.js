"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.handleOneOf = function (payload, path, types) {
    for (var i in types) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw utils_1.error("One of", path, payload);
};
exports.makeOneOf = function (types) { return function (payload, _, path) {
    return exports.handleOneOf(payload, path, types);
}; };
exports.default = (function (types, optional, nullable, convert, defaultValue) {
    return make_1.default(exports.makeOneOf(types), optional, nullable, convert, defaultValue);
});
//# sourceMappingURL=oneOf.js.map