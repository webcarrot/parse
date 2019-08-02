import { asyncArray as array, asyncShape as shape } from "../";
import { eq, string, number, boolean } from "../../sync";
import { error } from "@webcarrot/parse/utils";

describe("sync", () => {
  describe("shape", () => {
    test("A", () => {
      expect.assertions(1);
      const parser = shape({
        eq: eq("eq"),
        array: array(
          shape({
            string: string(),
            number: number().c,
            boolean: boolean().c,
            ostring: string().o,
            nstring: string().n
          })
        )
      });
      return expect(
        parser({
          eq: "eq",
          array: [
            {
              string: "a",
              number: 1,
              boolean: true,
              ostring: "ostring",
              nstring: "nstring"
            },
            {
              string: "b",
              number: "-1",
              boolean: 0,
              nstring: null
            }
          ]
        })
      ).resolves.toMatchObject({
        eq: "eq",
        array: [
          {
            string: "a",
            number: 1,
            boolean: true,
            ostring: "ostring",
            nstring: "nstring"
          },
          {
            string: "b",
            number: -1,
            boolean: false,
            nstring: null
          }
        ]
      });
    });
    test("should throw", () => {
      const parser = shape({
        eq: eq("eq"),
        array: array(
          shape({
            string: string(),
            number: number(),
            boolean: boolean()
          })
        )
      });
      return expect(
        parser({
          eq: "ss",
          array: [
            {
              string: "2",
              number: 1,
              boolean: true
            },
            {
              string: "b",
              number: -1,
              boolean: false
            }
          ]
        })
      ).rejects.toMatchObject(error("eq", ".eq", "ss"));
    });
  });
});
