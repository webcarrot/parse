import { array, number } from "../";
import { error } from "../../utils";

describe("sync", () => {
  describe("array", () => {
    test("array of numbers", () => {
      const parser = array(number());
      expect(parser([1])).toMatchObject([1]);
    });
    test("array of numbers from array of strings", () => {
      const parser = array(number({ convert: true }));
      expect(parser(["1", "2", 3, "4.5"])).toMatchObject([1, 2, 3, 4.5]);
    });
    test("should throw", () => {
      const parser = array(number());
      expect(() => {
        parser(123, "some.path");
      }).toThrow(error("Expect array of type", "some.path", 123));
    });
    test("should throw and print index", () => {
      const parser = array(number());
      expect(() => {
        parser([1, "2", 3]);
      }).toThrow(error("Expected numeric value", "[1]", "2"));
    });
    test("should throw and print index", () => {
      const parser = array(number());
      expect(() => {
        parser([1, "2", 3], "some.path");
      }).toThrow(error("Expected numeric value", "some.path[1]", "2"));
    });
    test("nullable", () => {
      const parser = array(number({ convert: true }), { nullable: true });
      expect(parser(null)).toEqual(null);
    });
    test("default", () => {
      const parser = array(number({ convert: true }), { default: [2] });
      expect(parser(undefined)).toMatchObject([2]);
    });
  });
});
