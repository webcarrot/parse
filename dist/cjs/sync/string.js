"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleString = function (payload, path, options) {
    if (!options.convert && typeof payload !== "string") {
        throw error_1.default("string", path, payload);
    }
    return "" + payload;
};
exports.default = (function (options) {
    return make_1.default(basic_1.default(handleString), options);
});
//# sourceMappingURL=string.js.map