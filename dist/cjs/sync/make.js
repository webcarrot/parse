"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make = function (fn, options) {
    if (options === void 0) { options = {}; }
    var handler = (function (payload, path) {
        if (path === void 0) { path = ""; }
        return fn(payload, path, options);
    });
    handler.then = function (onSuccess) {
        return make(function (payload, path) {
            return onSuccess(fn(payload, path, options), path);
        });
    };
    handler.catch = function (onError) {
        return make(function (payload, path) {
            try {
                return fn(payload, path, options);
            }
            catch (_) {
                return onError(payload, path);
            }
        });
    };
    handler.finally = function (onFinnaly) {
        return make(function (payload, path) {
            try {
                return onFinnaly(fn(payload, path, options), path);
            }
            catch (_) {
                return onFinnaly(payload, path);
            }
        });
    };
    return handler;
};
exports.default = make;
//# sourceMappingURL=make.js.map