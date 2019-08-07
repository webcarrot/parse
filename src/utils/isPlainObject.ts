export default (e: any): boolean =>
  e !== null && typeof e === "object" && e.constructor === Object;
