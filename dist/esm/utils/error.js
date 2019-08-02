const stringify = JSON.stringify;
export default (expect, path, value) => new Error(`Expect ${stringify(expect)} in ${stringify(path || "")} got ${stringify(value)}`);
//# sourceMappingURL=error.js.map