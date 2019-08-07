const make = (fn, options = {}) => {
    const handler = ((payload, path = "") => fn(payload, path, options));
    handler.then = onSuccess => make((payload, path) => onSuccess(fn(payload, path, options), path));
    handler.catch = onError => make((payload, path) => {
        try {
            return fn(payload, path, options);
        }
        catch (_) {
            return onError(payload, path);
        }
    });
    handler.finally = onFinnaly => make((payload, path) => {
        try {
            return onFinnaly(fn(payload, path, options), path);
        }
        catch (_) {
            return onFinnaly(payload, path);
        }
    });
    return handler;
};
export default make;
//# sourceMappingURL=make.js.map