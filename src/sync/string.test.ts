import { string } from "./";

describe("sync", () => {
  describe("string", () => {
    test("A", () => {
      const parser = string();
      expect(parser("A")).toEqual("A");
    });
    test("default A from undefined", () => {
      const parser = string().d("A");
      expect(parser(undefined)).toEqual("A");
    });
    test("default A from null", () => {
      const parser = string().d("A");
      expect(parser(null)).toEqual("A");
    });
    test("convert number", () => {
      const parser = string().c;
      expect(parser(1)).toEqual("1");
    });
    test("convert boolean", () => {
      const parser = string().c;
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
