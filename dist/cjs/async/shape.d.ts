import { AsyncParserFunction, AsyncMakeParserOut, AsyncReturnType } from "./types";
import { MakeParserOut } from "../sync/types";
export declare const isPlainObject: (e: any) => boolean;
export declare const handleShape: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>, S extends {
    [key: string]: T | TS;
}>(payload: any, path: string, data: S, keys: Extract<keyof S, string>[]) => Promise<ShapeReturnType<S>>;
declare type ShapeReturnType<S extends {
    [key: string]: AsyncMakeParserOut<any> | MakeParserOut<any>;
}> = {
    [K in keyof S]: AsyncReturnType<S[K]>;
};
export declare const makeShape: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>, S extends {
    [key: string]: T | TS;
}>(data: S, keys: Extract<keyof S, string>[]) => AsyncParserFunction<ShapeReturnType<S>, any>;
declare const _default: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>, S extends {
    [key: string]: T | TS;
}>(data: S, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: ShapeReturnType<S>) => AsyncMakeParserOut<AsyncParserFunction<ShapeReturnType<S>, any>>;
export default _default;
