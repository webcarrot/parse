declare class ParseError extends TypeError {
    readonly path: string;
    readonly value: any;
    constructor(message: string, path: string, value: any);
    toJSON(): {
        message: string;
        path: string;
        value: any;
    };
}
declare const _default: (message: string, path: string, value: any) => ParseError;
export default _default;
