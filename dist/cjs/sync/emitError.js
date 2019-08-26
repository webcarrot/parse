"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var error_1 = require("../utils/error");
var makeEmitError = function (value) { return function (payload, path) {
    throw error_1.default(value, path, payload);
}; };
exports.default = (function (value) { return make_1.default(makeEmitError(value)); });
//# sourceMappingURL=emitError.js.map