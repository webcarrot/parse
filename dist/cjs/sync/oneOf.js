"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.handleOnOf = function (payload, path, types) {
    for (var i in types) {
        try {
            return types[i](payload, path);
        }
        catch (_) { }
    }
    throw utils_1.error("One of", path, payload);
};
exports.makeOnOf = function (types) { return function (payload, _, path) {
    return exports.handleOnOf(payload, path, types);
}; };
exports.default = (function (types, optional, nullable, convert, defaultValue) {
    return make_1.default(exports.makeOnOf(types), optional, nullable, convert, defaultValue);
});
//# sourceMappingURL=oneOf.js.map