import make from "./make";
import error from "../utils/error";
const makeEmitError = (value) => (payload, path) => {
    throw error(value, path, payload);
};
export default (value) => make(makeEmitError(value));
//# sourceMappingURL=emitError.js.map