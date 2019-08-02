"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringify = JSON.stringify;
exports.default = (function (expect, path, value) {
    return new Error("Expect " + stringify(expect) + " in " + stringify(path || "") + " got " + stringify(value));
});
//# sourceMappingURL=error.js.map