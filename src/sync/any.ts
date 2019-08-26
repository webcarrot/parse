import { ParserFunction } from "./types";
import make from "./make";

const handleAny: ParserFunction<any> = payload => payload;

export default () => make<string>(handleAny);
