import { switchOnField, shape, eq, string, number } from "..";

describe("sync", () => {
  describe("switchOnField", () => {
    test("A", () => {
      const base = {
        query: shape(
          {
            q: string({ optional: true }),
          },
          { optional: true }
        ),
        params: shape(
          {
            id: string({ optional: true }),
          },
          { optional: true }
        ),
      };
      const parser = switchOnField<
        { method: "GET" | "POST"; query: any },
        "method"
      >("method", {
        GET: shape({
          method: eq<"GET">("GET"),
          ...base,
        }),
        POST: shape({
          method: eq<"POST">("POST"),
          ...base,
          body: shape({
            id: number({ convert: true }),
          }),
        }),
      });

      expect(
        parser({
          method: "POST",
          body: {
            id: "12",
            unknown: 2,
          },
        })
      ).toMatchObject({
        method: "POST",
        body: {
          id: 12,
        },
      });
    });
    test("should throw", () => {
      const base = {
        query: shape(
          {
            q: string({ optional: true }),
          },
          { optional: true }
        ),
        params: shape(
          {
            id: string({ optional: true }),
          },
          { optional: true }
        ),
      };

      const parser = switchOnField("method", {
        xxx: shape({
          method: eq<"xxx">("xxx"),
          ...base,
        }),
        POST: shape({
          method: eq<"POST">("POST"),
          ...base,
          body: shape({
            id: string({ nullable: true }),
          }),
        }),
      });
      expect(() => {
        parser({
          method: "POST",
        });
      }).toThrow();
    });
  });
});
