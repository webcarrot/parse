import { ParserFunction, MakeParserOut } from "./types";
declare const make: <T, PF extends ParserFunction<T, any> = ParserFunction<T, any>>(fn: PF, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: T, wrap?: boolean) => MakeParserOut<T, any, ParserFunction<T, any>>;
export default make;
