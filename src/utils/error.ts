class ParseError extends TypeError {
  readonly path: string;
  readonly value: any;

  constructor(message: string, path: string, value: any) {
    super(message);
    this.path = path;
    this.value = value;
  }

  toJSON() {
    return {
      message: this.message,
      path: this.path,
      value: this.value,
    };
  }
}

export default (message: string, path: string, value: any): ParseError =>
  new ParseError(message, path, value);
