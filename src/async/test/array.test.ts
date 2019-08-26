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
      const parser = array(number({ convert: true }));
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
        error("Expect array of type", "some.path", 123)
      );
    });
    test("should throw and print index", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser([1, "2", 3])).rejects.toMatchObject(
        error("Expected numeric value", "[1]", "2")
      );
    });
    test("should throw and print index", () => {
      expect.assertions(1);
      const parser = array(number());
      return expect(parser([1, "2", 3], "some.path")).rejects.toMatchObject(
        error("Expected numeric value", "some.path[1]", "2")
      );
    });
    test("nullable", () => {
      expect.assertions(1);
      const parser = array(number({ convert: true }), { nullable: true });
      return expect(parser(null)).resolves.toEqual(null);
    });
    test("default", () => {
      expect.assertions(1);
      const parser = array(number({ convert: true }), { default: [2] });
      return expect(parser(undefined)).resolves.toMatchObject([2]);
    });
  });
});
