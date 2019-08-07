import { string } from "../";

describe("sync", () => {
  describe("string", () => {
    test("A", () => {
      const parser = string();
      expect(parser("A")).toEqual("A");
    });
    test("default A from undefined", () => {
      const parser = string({ default: "A" });
      expect(parser(undefined)).toEqual("A");
    });
    test("default A from null", () => {
      const parser = string({ default: "A" });
      expect(parser(null)).toEqual("A");
    });
    test("convert number", () => {
      const parser = string({ convert: true });
      expect(parser(1)).toEqual("1");
    });
    test("convert boolean", () => {
      const parser = string({ convert: true });
      expect(parser(false)).toEqual("false");
    });
    test("should throw", () => {
      const parser = string();
      expect(() => {
        parser(12);
      }).toThrow();
    });
  });
});
