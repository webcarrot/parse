import make from "./make";

const handleAny = <T>(payload: T): T => payload;

export default <T>() => make<T, T>(handleAny);
