import { array, number } from "../";
import { error } from "../../utils";

describe("sync", () => {
  describe("array", () => {
    test("array of numbers", () => {
      const parser = array(number());
      expect(parser([1])).toMatchObject([1]);
    });
    test("array of numbers from array of strings", () => {
      const parser = array(number().c);
      expect(parser(["1", "2", 3, "4.5"])).toMatchObject([1, 2, 3, 4.5]);
    });
    test("should throw", () => {
      const parser = array(number());
      expect(() => {
        parser(123, "some.path");
      }).toThrow(error("Array", "some.path", 123));
    });
    test("should throw and print index", () => {
      const parser = array(number());
      expect(() => {
        parser([1, "2", 3]);
      }).toThrow(error("Number", "[1]", "2"));
    });
    test("should throw and print index", () => {
      const parser = array(number());
      expect(() => {
        parser([1, "2", 3], "some.path");
      }).toThrow(error("Number", "some.path[1]", "2"));
    });
    test("nullable", () => {
      const parser = array(number().c).n;
      expect(parser(null)).toEqual(null);
    });
    test("default", () => {
      const parser = array(number().c).d([2]);
      expect(parser(undefined)).toMatchObject([2]);
    });
  });
});
