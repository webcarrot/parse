"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleBoolean = function (payload, path, options) {
    if (!options.convert && typeof payload !== "boolean") {
        throw error_1.default("Expected boolean value", payload, path);
    }
    return !!payload;
};
exports.default = (function (options) {
    return make_1.default(basic_1.default(handleBoolean), options);
});
//# sourceMappingURL=boolean.js.map