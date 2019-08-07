const make = (fn, options = {}) => {
    const handler = ((payload, path = "") => fn(payload, path, options));
    handler.then = onSuccess => make((payload, path) => fn(payload, path, options).then(out => onSuccess(out, path)));
    handler.catch = onError => make((payload, path) => fn(payload, path, options).catch(() => onError(payload, path)));
    handler.finally = onFinnaly => make((payload, path) => fn(payload, path, options).then(output => onFinnaly(output, path), () => onFinnaly(payload, path)));
    return handler;
};
export default make;
//# sourceMappingURL=make.js.map