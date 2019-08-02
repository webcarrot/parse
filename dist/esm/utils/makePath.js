export default (path, append) => `${path}${typeof append === "number" ? `[${append}]` : `.${append}`}`;
//# sourceMappingURL=makePath.js.map