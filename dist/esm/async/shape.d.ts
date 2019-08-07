import { Parser } from "../sync/types";
import { ParseFunctionOptions } from "../types";
import { AsyncParser, AsyncReturnType } from "./types";
export declare const isPlainObject: (e: any) => boolean;
declare type ShapeReturnType<S extends {
    [key: string]: Parser<any> | AsyncParser<any>;
}> = {
    [K in keyof S]: AsyncReturnType<S[K]>;
};
declare const _default: <MPO extends Parser<any, any, ParseFunctionOptions<any>, import("../sync/types").ParserFunction<any, any, ParseFunctionOptions<any>>> | AsyncParser<any, any, ParseFunctionOptions<any>, import("../sync/types").ParserFunction<any, any, ParseFunctionOptions<any>>>, Shape extends {
    [key: string]: MPO;
}>(data: Shape, options?: ParseFunctionOptions<ShapeReturnType<Shape>>) => AsyncParser<ShapeReturnType<Shape>, any, ParseFunctionOptions<ShapeReturnType<Shape>>, import("../sync/types").ParserFunction<ShapeReturnType<Shape>, any, ParseFunctionOptions<ShapeReturnType<Shape>>>>;
export default _default;
