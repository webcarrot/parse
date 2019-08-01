"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var constants_1 = require("./constants");
exports.handleNumber = function (payload, convert) {
    if (typeof payload === "number") {
        return payload;
    }
    else if (convert &&
        typeof payload === "string" &&
        /^-?\d+(\.\d+)?$/.test(payload)) {
        return parseFloat(payload);
    }
    else {
        throw new Error(constants_1.ERR_INVALID_VALUE);
    }
};
exports.number = function () { return make_1.make(exports.handleNumber); };
//# sourceMappingURL=number.js.map