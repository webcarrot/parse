import { asyncArray as array } from "../";
import { number } from "../../sync";
import { error } from "../../utils";

describe("async", () => {
  describe("array", () => {
    test("array of numbers", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser([1])).resolves.toMatchObject([1]);
    });
    test("array of numbers from array of strings", () => {
      expect.assertions(1);
      const parser = array(number().c);
      return expect(parser(["1", "2", 3, "4.5"])).resolves.toMatchObject([
        1,
        2,
        3,
        4.5
      ]);
    });
    test("should throw", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser(123, "some.path")).rejects.toMatchObject(
        error("Array", "some.path", 123)
      );
    });
    test("should throw and print index", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser([1, "2", 3])).rejects.toMatchObject(
        error("Number", "[1]", "2")
      );
    });
    test("should throw and print index", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser([1, "2", 3], "some.path")).rejects.toMatchObject(
        error("Number", "some.path[1]", "2")
      );
    });
    test("nullable", () => {
      expect.assertions(1);
      const parser = array(number().c).n;
      return expect(parser(null)).resolves.toEqual(null);
    });
    test("default", () => {
      expect.assertions(1);
      const parser = array(number().c).d([2]);
      return expect(parser(undefined)).resolves.toMatchObject([2]);
    });
  });
});
