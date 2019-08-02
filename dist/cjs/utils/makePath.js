"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (path, append) {
    return "" + path + (typeof append === "number" ? "[" + append + "]" : "." + append);
});
//# sourceMappingURL=makePath.js.map