import { number } from "../";

describe("sync", () => {
  describe("number", () => {
    test("1", () => {
      const parser = number();
      expect(parser(1)).toEqual(1);
    });
    test("0", () => {
      const parser = number();
      expect(parser(0)).toEqual(0);
    });
    test("default 1 from undefined", () => {
      const parser = number({ default: 1 });
      expect(parser(undefined)).toEqual(1);
    });
    test("default 0 from undefined", () => {
      const parser = number({ default: 0 });
      expect(parser(undefined)).toEqual(0);
    });
    test("default 1 from null", () => {
      const parser = number({ default: 1 });
      expect(parser(null)).toEqual(1);
    });
    test("default 0 from null", () => {
      const parser = number({ default: 0 });
      expect(parser(null)).toEqual(0);
    });
    test("convert 1", () => {
      const parser = number({ convert: true });
      expect(parser("1")).toEqual(1);
    });
    test("convert 0", () => {
      const parser = number({ convert: true });
      expect(parser("0")).toEqual(0);
    });
    test("should throw", () => {
      const parser = number();
      expect(() => {
        parser("");
      }).toThrow();
    });
  });
});
