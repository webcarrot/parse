import { asyncOneOf as oneOf, asyncShape } from "../";
import { eq, string, number, shape } from "../../sync";
import { error } from "@webcarrot/parse/utils";

describe("async", () => {
  describe("oneOf", () => {
    test("A", () => {
      expect.assertions(1);
      const base = {
        query: shape(
          {
            q: string({ optional: true })
          },
          { optional: true }
        ),
        params: shape(
          {
            id: string({ optional: true })
          },
          { optional: true }
        )
      };
      const parser = oneOf([
        shape({
          method: eq("GET"),
          ...base
        }),
        asyncShape({
          method: eq("POST"),
          ...base,
          body: asyncShape({
            id: number({ convert: true })
          })
        })
      ]);
      return expect(
        parser({
          method: "POST",
          body: {
            id: "12",
            unknown: 2
          }
        })
      ).resolves.toMatchObject({
        method: "POST",
        body: {
          id: 12
        }
      });
    });
    test("should throw", () => {
      expect.assertions(1);
      const base = {
        query: asyncShape(
          {
            q: string({ optional: true })
          },
          { optional: true }
        ),
        params: asyncShape(
          {
            id: string({ optional: true })
          },
          { optional: true }
        )
      };
      const parser = oneOf([
        asyncShape({
          method: eq("GET"),
          ...base
        }),
        asyncShape({
          method: eq("POST"),
          ...base,
          body: asyncShape({
            id: string({ nullable: true })
          })
        })
      ]);
      return expect(
        parser({
          method: "POST"
        })
      ).rejects.toMatchObject(
        error("One of", "", {
          method: "POST"
        })
      );
    });
  });
});
