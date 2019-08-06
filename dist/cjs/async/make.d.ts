import { AsyncParserFunction, AsyncMakeParserOut } from "./types";
declare const make: <PF extends AsyncParserFunction<any, any>>(fn: PF, optional?: boolean, nullable?: boolean, convert?: boolean, defaultValue?: import("./types").AsyncUnpacked<ReturnType<PF>>, wrap?: boolean) => AsyncMakeParserOut<PF>;
export default make;
