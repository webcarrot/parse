import { AsyncParserFunction, AsyncMakeParserOut } from "./types";
import { MakeParserOut } from "../sync/types";
declare const _default: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>>(type: T | TS, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: (import("./types").AsyncUnpacked<ReturnType<T>> | ReturnType<TS>)[]) => AsyncMakeParserOut<AsyncParserFunction<any[], any>>;
export default _default;
