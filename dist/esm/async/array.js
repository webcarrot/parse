import make from "./make";
import basic from "./basic";
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
const makeArray = (type) => (payload, path) => handleArray(payload, path, type);
export default (type, options) => make(basic(makeArray(type)), options);
//# sourceMappingURL=array.js.map