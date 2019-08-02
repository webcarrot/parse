"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var utils_1 = require("../utils");
exports.handleNumber = function (payload, convert, path) {
    if (typeof payload === "number") {
        return payload;
    }
    else if (convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw utils_1.error("Number", path, payload);
    }
};
exports.default = (function (optional, nullable, convert, defaultValue) { return make_1.default(exports.handleNumber, optional, nullable, convert, defaultValue); });
//# sourceMappingURL=number.js.map