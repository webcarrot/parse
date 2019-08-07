import make from "./make";
import basic from "./basic";
import { error, makePath } from "../utils";
const handleArray = (payload, path, type) => {
    if (payload instanceof Array) {
        return payload.map((v, no) => type(v, makePath(path, no)));
    }
    else {
        throw error("Array", path, payload);
    }
};
const makeArray = (type) => (payload, path) => handleArray(payload, path, type);
export default (type, options) => make(basic(makeArray(type)), options);
//# sourceMappingURL=array.js.map