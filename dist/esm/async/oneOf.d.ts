import { AsyncParserFunction, AsyncMakeParserOut } from "./types";
import { MakeParserOut } from "../sync/types";
export declare const handleOnOf: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>>(payload: any, path: string, types: (T | TS)[]) => Promise<any>;
export declare const makeOnOf: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>>(types: (T | TS)[]) => AsyncParserFunction<import("./types").AsyncUnpacked<ReturnType<T>> | import("./types").AsyncUnpacked<ReturnType<TS>>, any>;
declare const _default: <T extends AsyncMakeParserOut<any>, TS extends MakeParserOut<any, any, import("../sync/types").ParserFunction<any, any>>>(types: (T | TS)[], optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: import("./types").AsyncUnpacked<ReturnType<T>>) => AsyncMakeParserOut<AsyncParserFunction<import("./types").AsyncUnpacked<ReturnType<T>> | import("./types").AsyncUnpacked<ReturnType<TS>>, any>>;
export default _default;
