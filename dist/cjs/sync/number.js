"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var basic_1 = require("./basic");
var error_1 = require("../utils/error");
var handleNumber = function (payload, path, options) {
    if (typeof payload === "number") {
        return payload;
    }
    else if (options.convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw error_1.default("Number", path, payload);
    }
};
exports.default = (function (options) {
    return make_1.default(basic_1.default(handleNumber), options);
});
//# sourceMappingURL=number.js.map