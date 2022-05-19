import { asyncArray as array } from "../";
import { number } from "../../sync";
import { error } from "../../utils";

describe("async", () => {
  describe("array", () => {
    test("array of numbers", async () => {
      const parser = array(number());
      await expect(parser([1])).resolves.toMatchObject([1]);
    });
    test("array of numbers from array of strings", async () => {
      const parser = array(number({ convert: true }));
      await expect(parser(["1", "2", 3, "4.5"])).resolves.toMatchObject([
        1, 2, 3, 4.5,
      ]);
    });
    test("should throw", async () => {
      const parser = array(number());
      await expect(parser(123, "some.path")).rejects.toMatchObject(
        error("Expect array of type", "some.path", 123)
      );
    });
    test("should throw and print index", async () => {
      const parser = array(number());
      await expect(parser([1, "2", 3])).rejects.toMatchObject(
        error("Expected numeric value", "[1]", "2")
      );
    });
    test("should throw and print index", async () => {
      const parser = array(number());
      await expect(parser([1, "2", 3], "some.path")).rejects.toMatchObject(
        error("Expected numeric value", "some.path[1]", "2")
      );
    });
    test("nullable", async () => {
      const parser = array(number({ convert: true }), { nullable: true });
      await expect(parser(null)).resolves.toEqual(null);
    });
    test("default", async () => {
      const parser = array(number({ convert: true }), { default: [2] });
      await expect(parser(undefined)).resolves.toMatchObject([2]);
    });
  });
});
