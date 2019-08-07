import { ParseFunctionOptions } from "../types";
import { ParserFunction, Parser } from "./types";
declare type ShapeReturnType<S extends {
    [key: string]: Parser<any>;
}> = {
    [K in keyof S]?: ReturnType<S[K]>;
};
declare const _default: <MPO extends Parser<any, any, ParseFunctionOptions<any>, ParserFunction<any, any, ParseFunctionOptions<any>>>, Shape extends {
    [key: string]: MPO;
}>(data: Shape, options?: ParseFunctionOptions<ShapeReturnType<Shape>>) => Parser<ShapeReturnType<Shape>, any, ParseFunctionOptions<ShapeReturnType<Shape>>, ParserFunction<ShapeReturnType<Shape>, any, ParseFunctionOptions<ShapeReturnType<Shape>>>>;
export default _default;
