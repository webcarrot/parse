import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser } from "./types";
export declare const isPlainObject: (e: any) => boolean;
declare function shape<V extends {
    [key: string]: any;
}>(data: {
    [K in keyof V]: Parser<V[K]> | AsyncParser<V[K]>;
}, options?: ParseFunctionOptions<V>): AsyncParser<V>;
export default shape;
