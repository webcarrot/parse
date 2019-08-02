export default (path: string, append: string | number) =>
  `${path}${typeof append === "number" ? `[${append}]` : `.${append}`}`;
