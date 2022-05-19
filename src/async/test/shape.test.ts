import { asyncArray as array, asyncShape as shape } from "../";
import { eq, string, number, boolean } from "../../sync";
import { error } from "../../utils";

describe("async", () => {
  describe("shape", () => {
    test("A", async () => {
      const parser = shape({
        eq: eq("eq"),
        array: array(
          shape({
            string: string(),
            number: number({ convert: true }),
            boolean: boolean({ convert: true }),
            ostring: string({ optional: true }),
            nstring: string({ nullable: true }),
          })
        ),
      });
      await expect(
        parser({
          eq: "eq",
          array: [
            {
              string: "a",
              number: 1,
              boolean: true,
              ostring: "ostring",
              nstring: "nstring",
            },
            {
              string: "b",
              number: "-1",
              boolean: 0,
              nstring: null,
            },
          ],
        })
      ).resolves.toMatchObject({
        eq: "eq",
        array: [
          {
            string: "a",
            number: 1,
            boolean: true,
            ostring: "ostring",
            nstring: "nstring",
          },
          {
            string: "b",
            number: -1,
            boolean: false,
            nstring: null,
          },
        ],
      });
    });
    test("should throw", async () => {
      const parser = shape({
        eq: eq("eq"),
        array: array(
          shape({
            string: string(),
            number: number(),
            boolean: boolean(),
          })
        ),
      });
      await expect(
        parser({
          eq: "ss",
          array: [
            {
              string: "2",
              number: 1,
              boolean: true,
            },
            {
              string: "b",
              number: -1,
              boolean: false,
            },
          ],
        })
      ).rejects.toMatchObject(error("Expected value equal to eq", ".eq", "ss"));
    });
  });
});
