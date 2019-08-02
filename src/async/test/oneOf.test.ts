import { asyncOneOf as oneOf, asyncShape } from "../";
import { eq, string, number, shape } from "../../sync";
import { error } from "@webcarrot/parse/utils";

describe("async", () => {
  describe("oneOf", () => {
    test("A", () => {
      expect.assertions(1);
      const base = {
        query: shape({
          q: string().o
        }).o,
        params: shape({
          id: string().o
        }).o
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
            id: number().c
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
        query: asyncShape({
          q: string().o
        }).o,
        params: asyncShape({
          id: string().o
        }).o
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
            id: string().n
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
