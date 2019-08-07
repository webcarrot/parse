import { oneOf, shape, eq, string, number } from "../";

describe("sync", () => {
  describe("oneOf", () => {
    test("A", () => {
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
          method: eq<"GET">("GET"),
          ...base
        }),
        shape({
          method: eq<"POST">("POST"),
          ...base,
          body: shape({
            id: number({ convert: true })
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
          method: eq<"GET">("GET"),
          ...base
        }),
        shape({
          method: eq<"POST">("POST"),
          ...base,
          body: shape({
            id: string({ nullable: true })
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
