import make from "./make";
const makeEmitValue = (value) => () => value;
export default (value) => make(makeEmitValue(value));
//# sourceMappingURL=emitValue.js.map