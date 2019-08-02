import { oneOf, shape, eq, string, number } from "../";

describe("sync", () => {
  describe("oneOf", () => {
    test("A", () => {
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
        shape({
          method: eq("POST"),
          ...base,
          body: shape({
            id: number().c
          })
        })
      ]);
      expect(
        parser({
          method: "POST",
          body: {
            id: "12",
            unknown: 2
          }
        })
      ).toMatchObject({
        method: "POST",
        body: {
          id: 12
        }
      });
    });
    test("should throw", () => {
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
          method: eq<"GET">("GET"),
          ...base
        }),
        shape({
          method: eq<"POST">("POST"),
          ...base,
          body: shape({
            id: string().n
          })
        })
      ]);
      expect(() => {
        parser({
          method: "POST"
        });
      }).toThrow();
    });
  });
});
