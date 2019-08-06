import { ParserFunction, MakeParserOut } from "./types";
export declare const isPlainObject: (e: any) => boolean;
export declare const handleShape: <T extends MakeParserOut<any, any, ParserFunction<any, any>>, S extends {
    [key: string]: T;
}>(payload: any, path: string, data: S) => ShapeReturnType<S>;
declare type ShapeReturnType<S extends {
    [key: string]: MakeParserOut<any>;
}> = {
    [K in keyof S]: ReturnType<S[K]>;
};
export declare const makeShape: <T extends MakeParserOut<any, any, ParserFunction<any, any>>, S extends {
    [key: string]: T;
}>(data: S) => ParserFunction<ShapeReturnType<S>, any>;
declare const _default: <T extends MakeParserOut<any, any, ParserFunction<any, any>>, S extends {
    [key: string]: T;
}>(data: S, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: ShapeReturnType<S>) => MakeParserOut<ShapeReturnType<S>, any, ParserFunction<ShapeReturnType<S>, any>>;
export default _default;
