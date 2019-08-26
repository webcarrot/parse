"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_1 = require("./make");
var makeEmitValue = function (value) { return function () { return value; }; };
exports.default = (function (value) { return make_1.default(makeEmitValue(value)); });
//# sourceMappingURL=emitValue.js.map