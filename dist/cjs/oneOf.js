"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleOnOf = function (payload, types) {
    for (var i in types) {
        try {
            return types[i](payload);
        }
        catch (_) { }
    }
    throw new Error(constants_1.ERR_INVALID_VALUE);
};
exports.makeOnOf = function (types) { return function (payload) {
    return exports.handleOnOf(payload, types);
}; };
exports.oneOf = function (types) { return make_1.make(exports.makeOnOf(types)); };
//# sourceMappingURL=oneOf.js.map