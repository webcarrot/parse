class ParseError extends TypeError {
    constructor(message, path, value) {
        super(message);
        this.path = path;
        this.value = value;
    }
    toJSON() {
        return {
            message: this.message,
            path: this.path,
            value: this.value
        };
    }
}
export default (message, path, value) => new ParseError(message, path, value);
//# sourceMappingURL=error.js.map