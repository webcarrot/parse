import { shape, eq, array, string, number, boolean } from "../";

describe("sync", () => {
  describe("shape", () => {
    test("A", () => {
      const parser = shape({
        eq: eq("eq"),
        array: array(
          shape({
            string: string(),
            number: number({ convert: true }),
            boolean: boolean({ convert: true }),
            ostring: string({ optional: true }),
            nstring: string({ nullable: true })
          })
        )
      });
      expect(
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
      ).toMatchObject({
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
      expect(() => {
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
        });
      }).toThrow();
    });
  });
});
