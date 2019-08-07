import { ParseFunctionOptions } from "../types";
import { Parser } from "./types";
declare function shape<V extends {
    [key: string]: any;
}>(data: {
    [K in keyof V]: Parser<V[K]>;
}, options?: ParseFunctionOptions<V>): Parser<V>;
export default shape;
