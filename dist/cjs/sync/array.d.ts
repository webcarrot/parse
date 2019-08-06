import { ParserFunction, MakeParserOut } from "./types";
declare const _default: <T>(type: MakeParserOut<T, any, ParserFunction<T, any>>, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: T[]) => MakeParserOut<T[], any, ParserFunction<T[], any>>;
export default _default;
