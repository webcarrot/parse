"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ParseError = (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message, path, value) {
        var _this = _super.call(this, message) || this;
        _this.path = path;
        _this.value = value;
        return _this;
    }
    ParseError.prototype.toJSON = function () {
        return {
            message: this.message,
            path: this.path,
            value: this.value
        };
    };
    return ParseError;
}(TypeError));
exports.default = (function (message, path, value) {
    return new ParseError(message, path, value);
});
//# sourceMappingURL=error.js.map