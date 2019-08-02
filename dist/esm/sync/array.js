import make from "./make";
import { error, makePath } from "../utils";
const handleArray = (payload, path, type) => {
    if (payload instanceof Array) {
        return payload.map((v, no) => type(v, makePath(path, no)));
    }
    else {
        throw error("Array", path, payload);
    }
};
const makeArray = (type) => (payload, _, path) => handleArray(payload, path, type);
export default (type, optional, nullable, convert, defaultValue) => make(makeArray(type), optional, nullable, convert, defaultValue);
//# sourceMappingURL=array.js.map