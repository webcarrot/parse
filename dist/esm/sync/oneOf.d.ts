import { ParserFunction, MakeParserOut } from "./types";
export declare const handleOneOf: <T extends MakeParserOut<any, any, ParserFunction<any, any>>>(payload: any, path: string, types: T[]) => any;
export declare const makeOneOf: <T extends MakeParserOut<any, any, ParserFunction<any, any>>>(types: T[]) => ParserFunction<ReturnType<T>, any>;
declare const _default: <T, TF extends MakeParserOut<T, any, ParserFunction<T, any>>[] = MakeParserOut<T, any, ParserFunction<T, any>>[]>(types: TF, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: T) => MakeParserOut<T, any, ParserFunction<T, any>>;
export default _default;
