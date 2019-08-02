import { eq } from "../";

describe("sync", () => {
  describe("eq", () => {
    test("true", () => {
      const parser = eq(true);
      expect(parser(true)).toEqual(true);
    });
    test("false", () => {
      const parser = eq(false);
      expect(parser(false)).toEqual(false);
    });
    test("default true from undefined", () => {
      const parser = eq(true).d(true);
      expect(parser(undefined)).toEqual(true);
    });
    test("default false from undefined", () => {
      const parser = eq(false).d(false);
      expect(parser(undefined)).toEqual(false);
    });
    test("default true from null", () => {
      const parser = eq(true).d(true);
      expect(parser(null)).toEqual(true);
    });
    test("default false from null", () => {
      const parser = eq(false).d(false);
      expect(parser(null)).toEqual(false);
    });
    test("string", () => {
      const parser = eq("A");
      expect(parser("A")).toEqual("A");
    });
    test("number", () => {
      const parser = eq(1);
      expect(parser(1)).toEqual(1);
    });
    test("should throw", () => {
      const parser = eq(1);
      expect(() => {
        parser("");
      }).toThrow();
    });
  });
});
