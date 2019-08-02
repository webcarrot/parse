import make from "./make";
import { error, makePath } from "../utils";
const handleArray = (payload, path, type) => {
    if (payload instanceof Array) {
        return Promise.all(payload.map((v, no) => {
            try {
                return type(v, makePath(path, no));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }));
    }
    else {
        return Promise.reject(error("Array", path, payload));
    }
};
const makeArray = (type) => (payload, _, path) => handleArray(payload, path, type);
export default (type, optional, nullable, convert, defaultValue) => make(makeArray(type), optional, nullable, convert, defaultValue);
//# sourceMappingURL=array.js.map