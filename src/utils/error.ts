const stringify = JSON.stringify;
export default (expect: any, path: string, value: any) =>
  new Error(
    `Expect ${stringify(expect)} in ${stringify(path || "")} got ${stringify(
      value
    )}`
  );
