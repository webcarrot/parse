import { boolean } from "./";

describe("sync", () => {
  describe("boolean", () => {
    test("true", () => {
      const parser = boolean();
      expect(parser(true)).toEqual(true);
    });
    test("false", () => {
      const parser = boolean();
      expect(parser(false)).toEqual(false);
    });
    test("default true from undefined", () => {
      const parser = boolean().d(true);
      expect(parser(undefined)).toEqual(true);
    });
    test("default false from undefined", () => {
      const parser = boolean().d(false);
      expect(parser(undefined)).toEqual(false);
    });
    test("default true from null", () => {
      const parser = boolean().d(true);
      expect(parser(null)).toEqual(true);
    });
    test("default false from null", () => {
      const parser = boolean().d(false);
      expect(parser(null)).toEqual(false);
    });
    test("convert true", () => {
      const parser = boolean().c;
      expect(parser("whatever")).toEqual(true);
    });
    test("convert false", () => {
      const parser = boolean().c;
      expect(parser("")).toEqual(false);
    });
    test("should throw", () => {
      const parser = boolean();
      expect(() => {
        parser("");
      }).toThrow();
    });
  });
});
